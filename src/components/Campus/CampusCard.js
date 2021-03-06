/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteCampusOnServer } from '../../store/campuses';

const CampusCard = ({ campus, studentCount, deleteCampus }) => {
  return (
    <div id="campus-card" className="flex border-5-20 margin-tb-20 padding-10">
      <div className="margin-r-5 width-40">
        <Link to={`/campuses/${campus.id}`}>
          <img className="campus-image border-5-20" src={campus.image_url} />
        </Link>
      </div>
      <div className="flex column margin-lr-10">
        <div>
          <h2>{campus.name}</h2>
        </div>
        <div>
          <h4>Students: {studentCount}</h4>
          <Link to={`/campuses/${campus.id}`}>
            <button className="btn btn-outline-primary show-small">More info</button>
          </Link>
        </div>

        <div>
          <Link to={`/campuses/${campus.id}/edit`}>
            <button className="btn btn-pad-10 btn-outline-success">Edit</button>
          </Link>
        </div>

        <div>
          <button onClick={() => deleteCampus(`${campus.id}`)} className="btn btn-outline-danger btn-pad-10">Delete</button>
        </div>
      </div>
    </div>
  )
};

const mapDispatch = (dispatch) => {
  return {
    deleteCampus: (id) => dispatch(deleteCampusOnServer(id))
  }
};

export default connect(null, mapDispatch)(CampusCard);
