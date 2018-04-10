/* eslint-disable */
const Student = require('./Student');
const Campus = require('./Campus');
const conn = require('./conn');
const faker = require('faker');
const chance = require('chance')(1234567);
const avatar = require('cartoon-avatar');

const campus_images = [ '../vendor/images/bu-campus.jpg', '../vendor/images/syracuse-campus.jpg', '../vendor/images/penn-campus.jpg' ];

const sync = () => conn.sync({ force: true });

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
  sync,
  conn,
  models: {
    Campus,
    Student
  }
};
