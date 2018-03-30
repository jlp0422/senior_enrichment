/* eslint-disable */
const Sequelize = require('sequelize')
const conn = require('./conn');

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  street: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.INTEGER
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
