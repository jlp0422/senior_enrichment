/* eslint-disable */
const faker = require('faker')
const chance = require('chance')(1234567);
const avatar = require('cartoon-avatar');
const db = require('./db');
const { Student, Campus } = db.models;

const numStudents = 18
const numCampuses = 6
