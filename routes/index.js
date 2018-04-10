const app = require('express').Router();
const db = require('../db');
const { Campus } = db.models;

module.exports = app;

app.use('/students', require('./students'));
app.use('/campuses', require('./campuses'));
