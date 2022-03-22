// const express = require('express');
// const cookieParser = require('cookie-parser');
// const morgan = require('morgan');
// const routes = require('./routes/index.js');
// require('./db.js');
import express from 'express'
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import router from './routes/index.js';
import * as db from './db.js'

const server = express();

server.name = 'API';

server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', router);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

export default server
// module.exports = server;