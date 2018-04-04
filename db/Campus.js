/* eslint-disable */
const Sequelize = require('sequelize')
const conn = require('./conn');

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: true
    }
  },
  street: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: true
    }
  },
  city: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: true
    }
  },
  zip: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: true
    }
  },
  image_url: {
    type: Sequelize.STRING,
    defaultValue: '../vendor/images/default-campus.png'
  }
}, {
  getterMethods: {
    city_state_zip: function() {
      return `${this.city}, ${this.state} ${this.zip}`
    }
  },
  underscored: true
})

module.exports = Campus;
