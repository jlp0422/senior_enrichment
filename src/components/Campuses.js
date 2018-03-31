/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CampusCard from './CampusCard';

const Campuses = ({ students, campuses }) => {
  return (
    <div>
    <h1>All Campuses</h1>
    <Link to='/campuses/create'>
      <button className="btn btn-outline-primary">Add Campus</button>
    </Link>
    {
      campuses.length ? (
        <div>
          {
            campuses &&
              campuses.map(campus => (
                <CampusCard key={campus.id} campus={campus} studentCount={students.filter(student => student.campus_id === campus.id).length} />
              ))
          }
        </div>
      ) : (
        <h3>We don't have any campuses</h3>
      )
    }
    </div>
  )
}

const mapState = ({ students, campuses }) => {
  return { campuses, students }
}

export default connect(mapState)(Campuses);
