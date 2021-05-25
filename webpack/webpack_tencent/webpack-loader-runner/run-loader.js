// const { runLoaders } = require('loader-runner');
// const fs = require('fs');
// const path = require('path');

// runLoaders({
//   resource: path.join(__dirname, './src/demo.txt'),
//   loaders: [
//     {
//       loader: path.join(__dirname, './src/raw-loader.js'),
//       options: {
//         name: 'yueluo'
//       }
//     }
//   ],
//   context: {
//     minimize: true
//   },
//   readResource: fs.readFile.bind(fs)
// }, (err, result) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(result);
// });


const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
  resource: './src/index.css',
  loaders: [
    {
      loader: path.join(__dirname, './loaders/sprite-loader.js'),
    }
  ],
  context: {
    minimize: true
  },
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(result);
});