require('dotenv').config();
const Server = require('./app/app');

const server = new Server();

server.listen();
