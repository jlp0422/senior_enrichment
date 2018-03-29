import React from 'react';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';

const Students = ({ students, student }) => {
  console.log(students)
  return (
    <div>
    <h1>Students</h1>
    {
      // students &&
      // students.map( student => (
      //   <StudentCard key={ student.id } student={ student } />
      // ))
      student &&
      <StudentCard key={ student.id } student={ student } />
    }
  </div>
  )
}

const mapState = ({ students }) => {
  const student = students.find(s => s.id === 1)
  return { students, student }
}

export default connect(mapState)(Students);
