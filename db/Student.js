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
  getterMethods: {
    full_name: function() {
      return `${this.first_name} ${this.last_name}`
    }
  },
  underscored: true
})

module.exports = Student
