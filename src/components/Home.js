import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

const Home = ({ studentCount, campusCount }) => {
  return (
    <div>
      <Helmet><title>Home</title></Helmet>
      <h1>Home page info will go here</h1>
      <h3>We have {studentCount} students across {campusCount} campuses.</h3>
    </div>
  )
}

const mapState = ( {students, campuses }) => {
  const campusCount = campuses.length
  const studentCount = students.length
  return { studentCount, campusCount }
}

export default connect(mapState)(Home);
