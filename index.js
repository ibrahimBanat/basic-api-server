'use strict';
require('dotenv').config();
const port = process.env.PORT;
const server = require('./src/server');

server.start(port);
