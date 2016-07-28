'use strict';

const path = require('path');
const express = require('express');
const app = express();

app.use('/admin', express.static(__dirname + '/example'));
app.use('/build', express.static(path.join(process.cwd() + '/build')));

app.listen(5000, () => {
  console.log('Listening port: 5000');
});
