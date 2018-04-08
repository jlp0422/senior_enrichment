/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveStudentOnServer } from '../../store/students';

const StudentCard = ({ student, campus, campusInfo, saveStudent }) => {
  return (
    <div className="card margin-10" style={{ minWidth: '23.2%' }}>
      <Link to={`/students/${student.id}`}>
        <img className="card-img-top student-image" src={student.image_url} />
      </Link>
      <div className="flex card-body space-btw column">
        <h4 className="card-title">{ student.full_name }</h4>
        <h6 className="card-text">GPA: <span className={`badge badge-${student.gpa > 3 ? `success` : `${student.gpa > 2 ? `warning` : `danger`}`}`}>{student.gpa}</span> </h6>
        <h6>Campus: { campus ? campus.name : ('Not enrolled') }</h6>
        {
          campusInfo ? (
            <div>
              <button
              onClick={() => saveStudent({ id: student.id, campus_id: null }, student.campus_id)}
              className="btn btn-outline-danger">
              Drop student
              </button>
            </div>)
            :
            <Link to={`/students/${student.id}`}>
              <button className="btn btn-outline-primary">More Info</button>
            </Link>
        }
      </div>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    saveStudent: (student, page) => dispatch(saveStudentOnServer(student, page))
  }
}

export default connect(null, mapDispatch)(StudentCard);
