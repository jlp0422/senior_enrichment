/* eslint-disable */
const Sequelize = require('sequelize');
const conn = require('./conn');

const Student = conn.define('student', {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a student first name'
      }
    }
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a student last name'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter an email address'
      },
      isEmail: {
        args: true,
        msg: 'Please enter a valid email address'
      }

    }
  },
  gpa: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a valid GPA'
      },
      max: {
        args: [4],
        msg: 'Please enter a GPA below 4.0'
      },
      min: {
        args: [0],
        msg: 'Please enter a GPA above 0'
      },
      isDecimal: {
        args: true,
        msg: 'Please enter a valid GPA'
      }
    }
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
  underscored: true
})

module.exports = Student
