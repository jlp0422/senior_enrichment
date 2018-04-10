/* eslint-disable */
const Sequelize = require('sequelize')
const conn = require('./conn');

// had to allow empty for 'quick create' functionality, where you can enter just a campus name

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a campus name'
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: {
      //   args: true,
      //   msg: 'Please enter a campus description'
      // }
    }
  },
  street: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: {
      //   args: false,
      //   msg: 'Please enter a campus street'
      // }
    }
  },
  city: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: {
      //   args: true,
      //   msg: 'Please enter a campus city'
      // }
    }
  },
  state: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: {
      //   args: true,
      //   msg: 'Please choose a campus state'
      // }
    }
  },
  zip: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      // notEmpty: {
      //   args: true,
      //   msg: 'Please enter a campus zip code'
      // }
    }
  },
  image_url: {
    type: Sequelize.STRING,
    defaultValue: '../vendor/images/default-campus-sim.jpg'
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
