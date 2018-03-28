const app = require('express').Router()
const db = require('../db')
const { Campus } = db.models

module.exports = app;

app.get('/', (req, res, next) => {
  Campus.findAll()
    .then( campuses => res.send(campuses))
    .catch(next)
})
