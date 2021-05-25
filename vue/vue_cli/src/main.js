const path = require('path'),
      { program } = require('commander'),
      { version } = require('./constants');

const mapActions = {
  'create': {
    alias: 'c',
    description: 'create a new project',
    examples: [
      'vue-cli create <project-name>'
    ],
  },
  'test': {
    alias: 't',
    description: 'this is a test',
    examples: [
      'test test'
    ]
  },
  '*': {
    alias: '',
    description: 'command not found',
    examples: []
  }
}

Reflect.ownKeys(mapActions).forEach(action => {
  program.command(action)
    .alias(mapActions[action].alias)
    .description(mapActions[action].description)
    .action(() => {
      if (action === '*') {
        console.log('command', mapActions[action].description);
        return;
      }
      require(path.resolve(__dirname, action))(...process.argv.slice(3));
    });
});

program.on('--help', () => {
  console.log('\nExamples：');
  Reflect.ownKeys(mapActions).forEach(action => {
    mapActions[action].examples.forEach(example => {
      console.log(`  ${example}`);
    });
  });
});

program.version(version).parse(process.argv);
