'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const restful = require('node-restful');
const mongoose = restful.mongoose;

const app = express();

app.use('/admin', express.static(__dirname + '/example'));
app.use('/build', express.static(path.join(process.cwd() + '/build')));

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(methodOverride());

mongoose.connect('mongodb://localhost/reactreduxadmin');

const Users = restful.model('users', mongoose.Schema({
    name: String,
    username: String,
    email: String,
    website: String
  }))
  .methods(['get', 'post', 'put', 'delete']);

const Posts = restful.model('posts', mongoose.Schema({
    title: String,
    body: String
  }))
  .methods(['get', 'post', 'put', 'delete']);

Users.register(app, '/users');
Posts.register(app, '/posts');

app.listen(5000, () => {
  console.log('Listening port: 5000');
});
