/* eslint-disable */
const Student = require('./Student');
const Campus = require('./Campus');
const conn = require('./conn');
const faker = require('faker');
const avatar = require('cartoon-avatar');

const campus_images = [ '../vendor/images/bu-campus.jpg', '../vendor/images/syracuse-campus.jpg', '../vendor/images/penn-campus.jpg' ]

const sync = () => {
  return conn.sync({ force: true })
}

Student.belongsTo(Campus);
Campus.hasMany(Student)

module.exports = {
  sync,
  conn,
  models: {
    Campus,
    Student
  }
}


// const generateStudent = () => {
//   return {
//     first_name: faker.name.firstName(),
//     last_name: faker.name.lastName(),
//     email: faker.internet.email(),
//     gpa: Math.round((Math.random() * 3) * 100) / 100 + 1,
//     image_url: avatar.generate_avatar()
//   }
// }

// const generateCampus = () => {
//   return {
//     name: faker.address.city(),
//     description: faker.lorem.paragraph(),
//     street: faker.address.streetAddress(),
//     city: faker.address.city(),
//     state: faker.address.stateAbbr(),
//     zip: faker.random.number(),
//     image_url: campus_images[(Math.floor(Math.random() * 3))]
//   }
// }

// const seed = () => {
//   return Promise.all([
//     Student.create(generateStudent()),
//     Student.create(generateStudent()),
//     Student.create(generateStudent()),
//     Student.create(generateStudent()),
//     Student.create(generateStudent()),
//     Student.create(generateStudent()),
//     Student.create(generateStudent()),
//     Student.create(generateStudent()),
//     Student.create(generateStudent()),
//     Student.create(generateStudent()),
//     Campus.create(generateCampus()),
//     Campus.create(generateCampus()),
//     Campus.create(generateCampus()),
//     Campus.create(generateCampus()),
//     Campus.create(generateCampus())
//   ])
//   .then(([s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, c1, c2, c3, c4, c5]) => {
//     s1.setCampus(c1)
//     s2.setCampus(c2)
//     s3.setCampus(c2)
//     s4.setCampus(c1)
//     s5.setCampus(c2)
//     s6.setCampus(c3),
//     s7.setCampus(c5)
//   })
// }
