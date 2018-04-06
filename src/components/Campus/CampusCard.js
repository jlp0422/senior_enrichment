/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCampusOnServer } from '../../store/campuses';

const CampusCard = ({ campus, studentCount, deleteCampus }) => {
  return (
    <div className="flex border-5-20 margin-tb-10 padding-10" style={{ backgroundColor: '#f0f3f8' }}>
      <div style={{ maxWidth: '40%', margin: '0px 5px 0px 0px' }}>
        <Link to={`/campuses/${campus.id}`}>
          <img className="campus-image border-5-20" src={campus.image_url} />
        </Link>
      </div>
      <div className="margin-lr-10">
        <h2>{campus.name}</h2>
        {/* <p>{campus.description}</p> */}
        <h5>Students: {studentCount}</h5>
        <Link to={`/campuses/${campus.id}/edit`}>
          <button className="btn btn-outline-success">Edit</button>
        </Link>
        <br />
        <button onClick={() => deleteCampus(`${campus.id}`)} className="btn btn-outline-danger btn-pad-10">Delete</button>
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
