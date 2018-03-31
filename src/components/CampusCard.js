/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCampusOnServer } from '../store/campuses';

const CampusCard = ({ campus, studentCount, deleteCampus }) => {
  return (
    <div style={{display: 'flex', margin: '10px 0px'}}>
      <div style={{ maxWidth: '40%', margin: '0px 5px 0px 0px' }}>
        <Link to={`/campuses/${campus.id}`}>
          <img style={{ borderRadius: '10px'}} src={campus.image_url} />
        </Link>
      </div>
      <div style={{ margin: '0px 10px' }}>
        <h2>{campus.name}</h2>
      {/* <p>{campus.description}</p> */}
        <h5>Students: {studentCount}</h5>
        <Link to={`/campuses/${campus.id}/edit`}>
          <button className="btn btn-outline-success">Edit</button>
        </Link>&nbsp;&nbsp;
        <button onClick={() => deleteCampus(`${campus.id}`)} className="btn btn-outline-danger">Delete</button>
      </div>
    </div>
  )
}

const mapDispatch = (dispatch) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampusOnServer(id))
  }
}

export default connect(null, mapDispatch)(CampusCard);
