/* eslint-disable */
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Student, Campus } = db.models;

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/api', require('./routes'))

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`))

db.sync()
  .then(() => console.log('database is synced'))
  .then(() => db.seed())
  .then(() => console.log('database is seeded'))
