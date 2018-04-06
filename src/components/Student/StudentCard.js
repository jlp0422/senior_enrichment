/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StudentCard = ({ student, campus }) => {
  return (
    <div className="card margin-10" style={{ minWidth: '23.2%' }}>
      <Link to={`/students/${student.id}`}>
        <img className="card-img-top student-image" src={student.image_url} />
      </Link>
      <div className="flex card-body space-btw column">
        <h4 className="card-title">{ student.full_name }</h4>
        <h6 className="card-text">GPA: { student.gpa } </h6>
        <h6>Campus: { campus ? campus.name : ('Not enrolled') }</h6>
        <Link to={`/students/${student.id}`}>
          <button className="btn btn-outline-primary">More Info</button>
        </Link>
      </div>
    </div>
  )
}

export default StudentCard;
