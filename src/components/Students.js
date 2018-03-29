import React from 'react';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';

const Students = ({ students, campuses }) => {
  return (
    <div className="container">
    <h1>Students</h1>
    <div className="card-group">
    {
      students && campuses &&
      students.map( student => (
        <StudentCard key={ student.id } student={ student } campus={ campuses.find(campus => campus.id === student.campus_id) } />
      ))
    }
    </div>
  </div>
  )
}

const mapState = ({ students, campuses }) => {
  return { students, campuses }
}

export default connect(mapState)(Students);
