/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentCard from './StudentCard';

const CampusInfo = ({ campus, campus_students }) => {
  if (!campus) return null
  return (
    <div>
      <img src={campus.image_url} />
      <h2>{campus.name}</h2>
      <h5>{campus.street}<br/>{campus.city_state_zip}</h5>
      <p>{campus.description}</p>
      <h2>Students on campus</h2>
      <div className="card-group">
        {
          campus_students.map(student => (
            <StudentCard key={student.id} student={student} />
          ))
        }
      </div>
    </div>
  )
}

const mapState = ({students, campuses}, { id }) => {
  const campus = campuses && campuses.find( campus => campus.id === id)
  const campus_students = students && students.filter(student => student.campus_id === id)
  return { campus, campus_students }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(CampusInfo);
