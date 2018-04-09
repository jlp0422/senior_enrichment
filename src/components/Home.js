import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = ({ studentCount, campusCount }) => {
  return (
    <div>
      <Helmet><title>Home</title></Helmet>
      <div className="jumbotron jumbo-home text-center">
        <img className="img-75" src="./vendor/images/logo-black-no-bkg.png" />
        <h1 className="display-3">Welcome to the School</h1>
        <p className="lead">We have {studentCount} {studentCount === 1 ? ('student') : ('students')}&nbsp;across {campusCount}&nbsp;{campusCount === 1 ? ('campus') : ('campuses')}.</p>
        <hr className="my-4" />
        <h5>Take time to explore all of our <Link className="home-link" to='/students'>students</Link>&nbsp;and&nbsp;<Link className="home-link" to='/campuses'>campuses</Link>.</h5>
      </div>
    </div>
  )
}

const mapState = ( {students, campuses }) => {
  const campusCount = campuses.length
  const studentCount = students.length
  return { studentCount, campusCount }
}

export default connect(mapState)(Home);
