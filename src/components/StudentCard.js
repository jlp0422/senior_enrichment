/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';

const StudentCard = ({ student }) => {
  return (
    <div>
    <h1>Student: { student.full_name } </h1>
    <img src={student.image_url} />
    </div>
  )
}

export default StudentCard
