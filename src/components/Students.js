/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentCard from './StudentCard';

const Students = ({ students, campuses }) => {
  return (
    <div>
    <h1>All Students</h1>

    <Link to='/students/create'>
      <button>Add Student</button>
    </Link>
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
