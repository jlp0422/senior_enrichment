/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CampusCard from './CampusCard';

const Campuses = ({ students, campuses }) => {
  return (
    <div>
      {
        campuses &&
        campuses.map( campus => (
          <CampusCard key={ campus.id } campus={ campus } studentCount={ students.filter(student => student.campus_id === campus.id).length}/>
        ))
      }
    </div>
  )
}

const mapState = ({ students, campuses }) => {
  return { campuses, students }
}

export default connect(mapState)(Campuses);
