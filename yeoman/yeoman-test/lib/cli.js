#!/usr/bin/env node
'use strict';
const meow = require('meow');
const yeoman = require('./');

const cli = meow(`
Usage
  $ yeoman [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ yeoman
  unicorns
  $ yeoman rainbows
  unicorns & rainbows
`);
