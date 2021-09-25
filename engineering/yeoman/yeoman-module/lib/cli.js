#!/usr/bin/env node
'use strict';
const meow = require('meow');
const yeomanModule = require('./');

const cli = meow(`
Usage
  $ yeoman-module [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ yeoman-module
  unicorns
  $ yeoman-module rainbows
  unicorns & rainbows
`);
