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
    defaultValue: '../vendor/images/default-profile.png'
  }
}, {
  getterMethods: {
    full_name: function() {
      return `${this.first_name} ${this.last_name}`
    }
  },
  // setterMethods: {
  //   full_name: function(value) {
  //     const names = value.split(' ');
  //     this.setDataValue('first_name', names.slice(0, -1).join(' '));
  //     this.setDataValue('last_name', names.slice(-1).join(' '));
  //   }
  // },
  underscored: true
})

module.exports = Student
