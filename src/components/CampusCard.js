/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import StudentCard from './StudentCard';

const CampusCard = ({ campus, studentCount }) => {
  return (
    <div>
      <Link to={`/campuses/${campus.id}`}>
        <img src={campus.image_url} />
      </Link>
      <h2>{campus.name}</h2>
      <h5>Students: {studentCount}</h5>
      <Link to={`/campuses/${campus.id}/edit`}>
        <button className="btn btn-outline-success">Edit</button>
      </Link>&nbsp;&nbsp;
      <button className="btn btn-outline-danger">Delete</button>
    </div>
  )
}

export default CampusCard;
