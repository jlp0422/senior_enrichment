/* eslint-disable */
const Student = require('./Student');
const Campus = require('./Campus');
const conn = require('./conn');
const faker = require('faker');
const avatar = require('cartoon-avatar');

const sync = () => {
  return conn.sync({ force: true })
}

const generateStudent = () => {
  return {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    gpa: Math.round((Math.random() * 3) * 100) / 100 + 1,
    image_url: avatar.generate_avatar()
  }
}

const generateCampus = () => {
  return {
    name: faker.address.city(),
    description: faker.lorem.paragraph(),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.stateAbbr(),
    zip: faker.random.number()
  }
}

const seed = () => {
  return Promise.all([
    Student.create(generateStudent()),
    Student.create(generateStudent()),
    Student.create(generateStudent()),
    Student.create(generateStudent()),
    Student.create(generateStudent()),
    Student.create(generateStudent()),
    Campus.create(generateCampus()),
    Campus.create(generateCampus()),
    Campus.create(generateCampus())
  ])
  .then(([s1, s2, s3, s4, s5, s6, c1, c2, c3]) => {
    s1.setCampus(c1)
    s2.setCampus(c2)
    s3.setCampus(c2)
    s4.setCampus(c1)
    s5.setCampus(c2)
    s6.setCampus(c3)
  })
}

Student.belongsTo(Campus);
Campus.hasMany(Student, { onDelete: 'cascade' })

module.exports = {
  sync,
  seed,
  models: {
    Campus,
    Student
  }
}
