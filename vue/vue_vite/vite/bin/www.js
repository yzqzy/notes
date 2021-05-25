#! /usr/bin/env node

const createServer = require('../index');

const app = createServer();

app.listen(4000, () => {
  console.log('Server running at port 4000.');
});