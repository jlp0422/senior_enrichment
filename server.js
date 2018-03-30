/* eslint-disable */
const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');
const db = require('./db');
const { Student, Campus } = db.models;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/vendor', express.static(path.join(__dirname, 'public')));
app.use(require('body-parser').json())
// app.use(volleyball)

// Route
app.use('/api', require('./routes'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`));

db.sync()
  .then(() => console.log('database is synced'))
  .then(() => db.seed())
  .then(() => console.log('database is seeded'))
