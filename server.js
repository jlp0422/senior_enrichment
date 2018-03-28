/* eslint-disable */
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { Student, Campus } = db.models;

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/students', (req, res, next) => {
  Student.findAll()
    .then( students => res.send(students))
    .catch(next)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`))

db.sync()
  .then(() => console.log(`seeded`))
  .then(() => db.seed())
