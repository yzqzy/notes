import express from "express";

const app = express();

app.use(express.static('dist'));

const template = `
  <html>
    <head>
      <title>React Fiber</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="build.js"></script>
    </body>
  </html>
`

app.get("*", (req, res) => {
  res.send(template);
});

app.listen(4000, () => console.log('server is running.'));