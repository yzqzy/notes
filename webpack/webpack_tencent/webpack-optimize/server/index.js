const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');

const SEARCH_SSR = require('../dist/search-server');
const SEARCH_TEMPLATE = fs.readFileSync(path.resolve(__dirname, '../dist/search.html'), 'utf-8');
const DATA = require('./data.json');

const server = (port) => {
  const app = express();

  app.use(express.static('../dist'));

  app.get('/search', (req, res) => {
    const htmlStr = renderMarkUp(renderToString(SEARCH_SSR));
    res.status(200).send(htmlStr);
  });

  app.listen(port, () => {
    console.log('Server is running on port：', port);
  });
}

server(process.env.PORT || 3000);

const renderMarkUp = (str) => {
  const dataStr = JSON.stringify(DATA);
  return SEARCH_TEMPLATE.replace('<!--HTML_PLACEHOLDER-->', str)
                        .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window._initial_data=${dataStr}</script>`);
}