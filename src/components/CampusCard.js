/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';
import { deleteCampusOnServer } from '../store/campuses';

const CampusCard = ({ campus, studentCount, deleteCampus }) => {
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
      <button onClick={() => deleteCampus(`${campus.id}`)} className="btn btn-outline-danger">Delete</button>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampusOnServer(id))
  }
}

export default connect(null, mapDispatch)(CampusCard);
