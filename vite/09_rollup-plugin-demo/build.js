const rollup = require('rollup');
const util = require('util');

async function build() {
  const bundle = await rollup.rollup({
    input: ['./src/index.js'],
  });
  console.log(util.inspect(bundle));
}

build();