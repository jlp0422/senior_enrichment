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
  image_url: {
    type: Sequelize.STRING
  }
}, {
  underscored: true
})

module.exports = Campus;
