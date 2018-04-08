/* eslint-disable */
const faker = require('faker')
const chance = require('chance')(1234567);
const avatar = require('cartoon-avatar');
const db = require('./db');
const _conn = require('./db/conn')
const { Student, Campus } = db.models;

const numStudents = 40;
const numCampuses = 7;

const campus_images = ['../vendor/images/bu-campus.jpg', '../vendor/images/syracuse-campus.jpg', '../vendor/images/penn-campus.jpg'];

const doTimes = (n, func) => {
  const results = []
  while (n--) {
    results.push(func())
  }
  return results;
};

function randomStudent() {
  const gender = chance.gender()
  const first_name = chance.first({ gender })
  const last_name = chance.last({ nationality: 'en' })
  return Student.build({
    first_name: first_name,
    last_name: last_name,
    email: `${first_name.toLowerCase()}.${last_name.toLowerCase()}@school.edu`,
    gpa: Math.round((Math.random() * 3) * 100) / 100 + 1,
    image_url: avatar.generate_avatar({gender: gender })
  })
};

function randomCampus() {
  return Campus.build({
    name: faker.address.city(),
    description: faker.lorem.paragraph(),
    street: chance.address({ short_suffix: true }),
    city: faker.address.city(),
    state: chance.state({ country: 'us' }),
    zip: chance.zip(),
    image_url: chance.pickone(campus_images)
  })
};

const students = doTimes(numStudents, randomStudent)
const campuses = doTimes(numCampuses, randomCampus)

const seed = () => {
  return Promise.all(campuses.map(campus => campus.save()))
    .then(() => Promise.all(students.map(student => {
      student.save()
      .then( student => {
        student.setCampus(chance.pickone(campuses))
      })
    }))
)}

console.log("database is syncing...")
// console.log(_conn.close)

_conn.sync({force: true})
  .then(() => {
    console.log('database is seeding...')
    return Promise.all(campuses.map(campus => campus.save()))
      .then(() => {
        return Promise.all(students.map(student => {
        student.save()
          .then(student => {
            student.setCampus(chance.pickone(campuses))
          })
      })
      )})
  })
  .then(() => console.log('database has seeded'))
  .catch(err => {
    console.error('Error while seeding')
    console.error(err.stack)
  })
  .then(() => {
    _conn.close();
    return null;
  });
