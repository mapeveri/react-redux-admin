'use strict';

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const app = express();
const router = express.Router();

app.use('/admin', express.static(__dirname + '/example'));
app.use('/build', express.static(path.join(process.cwd() + '/build')));

app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://localhost/reactreduxadmin');

restify.serve(router, 
  mongoose.model('posts', new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, require: true }
  })), {totalCountHeader: true}
);

restify.serve(router, 
  mongoose.model('users', new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, require: true },
    email: { type: String, require: true },
    website: { type: String, require: true }
  })), {totalCountHeader: true}
);

app.use(router);

app.listen(5000, () => {
  console.log('Listening port: 5000');
});
