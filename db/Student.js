/* eslint-disable */
const Sequelize = require('sequelize');
const conn = require('./conn');

const Student = conn.define('student', {
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
  },
  gpa: {
    type: Sequelize.FLOAT,
  },
  image_url: {
    type: Sequelize.STRING,
  }
}, {
  underscored: true
})

module.exports = Student
