/* eslint-disable */
const express = require('express');
const app = express();
const volleyball = require('volleyball');
const path = require('path');
const db = require('./db');
const { Student, Campus } = db.models;

// Middleware
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('body-parser').json())
// app.use(volleyball)

// Static Routes
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/vendor', express.static(path.join(__dirname, 'public')));

// Route
app.use('/api', require('./routes'));

// Single 'get' to send index file
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// Error handling
app.use((err, req, res, next) => {
  console.log(err.errors)
  res.status(500).send(err.errors[0])
})

// Port listening
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port of call: ${port}`));

// Database syncing
// db.sync()
//   .then(() => console.log('database is synced'))
//   .then(() => db.seed())
//   .then(() => console.log('database is seeded'))
