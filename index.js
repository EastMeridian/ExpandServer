const app = require('express')();
const http = require('http').createServer(app);
const socket = require('./src/socket/createSocket')({ http });

const PORT = 8080;

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}:PORT`);
});
