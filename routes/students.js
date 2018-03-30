const app = require('express').Router();
const db = require('../db');
const { Student } = db.models;
const avatar = require('cartoon-avatar');

module.exports = app;

// default: /api/students
app.get('/', (req, res, next) => {
  Student.findAll()
    .then(students => res.send(students))
    .catch(next)
});

app.post('/', (req, res, next) => {
  if (req.body.image_url === '') {
    req.body.image_url = avatar.generate_avatar()
  }
  Student.create(req.body)
    .then( student => res.send(student))
    .catch(next)
});

app.delete('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then( student => student.destroy())
    .then(() => res.sendStatus(204))
    .catch(next)
});

app.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then( student => {
      Object.assign(student, req.body)
      return student.save()
    })
    .then( student => res.send(student))
    .catch(next)
});
