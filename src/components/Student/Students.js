/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentCard from './StudentCard';
import { Helmet } from 'react-helmet';

const Students = ({ students, campuses }) => {
  return (
    <div style={{ marginBottom: '40px' }}>
      <Helmet><title>All Students</title></Helmet>
      <h1 style={{margin: '0px 10px'}}>All Students</h1>
      <Link style={{ margin: '0 10px' }} to='/students/create'>
        <button style={{ margin: '10px 0px'}}className="btn btn-outline-primary">Add Student</button>
      </Link>
      {
        students.length ? (
          <div className="card-group">
            {
              students && campuses &&
              students.map(student => (
                <StudentCard key={student.id} student={student} campus={campuses.find(campus => campus.id === student.campus_id)} />
              ))
            }
          </div>
        ) : (
          <h3>We don't have any students</h3>
        )
      }
  </div>
  )
}

const mapState = ({ students, campuses }) => {
  return { students, campuses }
}

export default connect(mapState)(Students);
