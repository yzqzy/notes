import express from "express";

const app = express();

const template = `
  <html>
    <head>
      <title>React Fiber</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>
`

app.get("*", (req, res) => {
  res.send(template);
});

app.listen(4000, () => console.log('server is running.'));