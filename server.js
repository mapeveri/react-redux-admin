'use strict';

const path = require('path');
const express = require('express');
const app = express();

const jsonServer = require('json-server');
const router = jsonServer.router('db/db.json');
const middlewares = jsonServer.defaults();

app.use('/admin', express.static(__dirname + '/example'));
app.use('/build', express.static(path.join(process.cwd() + '/build')));

app.use(middlewares);
app.use(router);

app.listen(5000, () => {
  console.log('Listening port: 5000');
});
