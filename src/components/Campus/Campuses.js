/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CampusCard from './CampusCard';
import { Helmet } from 'react-helmet';

const Campuses = ({ students, campuses }) => {
  return (
    <div style={{ margin: '0px 10px 60px' }}>
      <Helmet><title>All Campuses</title></Helmet>
      <div className="flex" style={{ alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }} >
          <h1>All Campuses</h1>
        </div>
        <div>
          <Link to='/campuses/create'>
            <button className="btn btn-primary">Add Campus</button>
          </Link>
        </div>
      </div>
    {
      campuses.length ? (
        <div>
          {
            campuses &&
              campuses.map(campus => (
                <CampusCard key={campus.id} campus={campus} studentCount={students.filter(student => student.campus_id === campus.id).length} />
              ))
          }
        </div>
      ) : (
        <div style={{marginTop: '20px', textAlign: 'center' }}>
        <h2 style={{ paddingBottom: '20px'}}>We don't have any campuses.</h2>
          <Link to='/campuses/create'>
            <button className="btn btn-primary">Add Campus</button>
          </Link>
        </div>
      )
    }
    </div>
  )
}

const mapState = ({ students, campuses }) => {
  return { campuses, students }
}

export default connect(mapState)(Campuses);
