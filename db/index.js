/* eslint-disable */
const Student = require('./Student');
const Campus = require('./Campus');
const conn = require('./conn');
const faker = require('faker');
const chance = require('chance')(1234567);
const avatar = require('cartoon-avatar');

const campus_images = [ '../vendor/images/bu-campus.jpg', '../vendor/images/syracuse-campus.jpg', '../vendor/images/penn-campus.jpg' ]

const sync = () => {
  return conn.sync({ force: true })
}

Student.belongsTo(Campus);
Campus.hasMany(Student)

const numStudents = 40;
const numCampuses = 7;

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
    image_url: avatar.generate_avatar({ gender: gender })
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
        .then(student => {
          student.setCampus(chance.pickone(campuses))
        })
    }))
    )
}

module.exports = {
  sync,
  seed,
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
