const express = require('express');
const socket = require('socket.io');
const path = require('path');
const http = require('http');

const env = require('./env');
const D = require('./debug');

// init variables before start

process.env = Object.assign(env, process.env);
global.D = D;

//

const socketEvents = require('./socketEvents');

const publicPath = path.join(__dirname, '../public');
const port = env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', socketEvents);

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server started on port ${port}`)
});
