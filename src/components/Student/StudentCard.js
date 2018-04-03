/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const StudentCard = ({ student, campus }) => {
  return (
    <div className="card" style={{ minWidth: '30%', margin: '10px' }}>
      <Link to={`/students/${student.id}`}>
        <img className="card-img-top" src={student.image_url} />
      </Link>
      <div className="card-body">
        <h4 className="card-title">{ student.full_name }</h4>
        <h6 className="card-text">GPA: { student.gpa } </h6>
        <h6>Campus: { campus ? campus.name : ('No campus') }</h6>
        <Link to={`/students/${student.id}`}>
          <button className="btn btn-primary">More Info</button>
        </Link>
      </div>
    </div>
  )
}

export default StudentCard;
