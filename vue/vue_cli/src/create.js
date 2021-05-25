const { promisify } = require('util'),
      path = require('path'),
      fs = require('fs');

const axios = require('axios'),
      ora = require('ora'),
      Inquirer = require('inquirer'),
      Metalsmith = require('metalsmith'),
      { downloadDest } = require('./constants');
const cons = require('consolidate');
    
let downloadGithubRepo = require('download-github-repo'),
    ncp = require('ncp').ncp,
    { render } = require('consolidate').ejs;

downloadGithubRepo = promisify(downloadGithubRepo);
ncp = promisify(ncp);
render = promisify(render);

const waitFnLoading = (fn, message) => async (...args) => {
  const spinner = ora(message);
  spinner.start();
  const repos = await fn(...args);
  spinner.succeed();
  return repos;
}

const fetchReposList = async () => {
  const { data } = await axios.get('https://api.github.com/orgs/jspp-cli/repos');
  return data;
}

const fetchTagsList = async (repo) => {
  const { data } = await axios.get(`https://api.github.com/repos/jspp-cli/${repo}/tags`);
  return data;
}

const downloadGitRepo = async (repo, tag) => {
  let api = `jspp-cli/${repo}`;
  tag && (api += `#${tag}`);
  const dest = `${downloadDest}/${repo}`;
  await downloadGithubRepo(api, dest);
  return dest;
}

module.exports = async (projectName) => {
  let repos = await waitFnLoading(fetchReposList, 'fetching template...')();
  repos = repos.map(item => item.name);

  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'Choose a template to create project',
    choices: repos
  });

  let tags = await waitFnLoading(fetchTagsList, 'fetching tags...')(repo);
  tags = tags.map(item => item.name);

  const { tag } = await Inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: 'Choose a tag to create project',
    choices: tags
  });

  const dest = await waitFnLoading(downloadGitRepo, 'downloading template...')(repo, tag);

  let isQuestionFileExist = false;
  isQuestionFileExist = fs.existsSync(path.join(dest, 'questions.json'));

  if (!isQuestionFileExist) {
    await ncp(dest, path.resolve(projectName));
  } else {
    await new Promise((resolve, reject) => {
      Metalsmith(__dirname)
      .source(dest)
      .destination(path.resolve(projectName))
      .use(async (files, metal, done) => {
        const questions = require(path.join(dest, 'questions.json'));
        const answer = await Inquirer.prompt(questions);

        const metadata = metal.metadata();
        Object.assign(metadata, answer);
        delete files['questions.json'];

        done();
      })
      .use((files, metal, done) => {
        const metadata = metal.metadata();

        Reflect.ownKeys(files).forEach(async file => {
          if (file.includes('js') || file.includes('json')) {
            const regex = /<%=(.*?)%>/g;
            
            let content = files[file].contents.toString();

            if (regex.test(content)) {
              content = await render(content, metadata);
              files[file].contents = Buffer.from(content);
            }
          }
        });
        
        done();
      })
      .build(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      })
    });
  }
}