const app = require('express').Router()
const db = require('../db')
const { Student } = db.models

module.exports = app;

app.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next)
})
