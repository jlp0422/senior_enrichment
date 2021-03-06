/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Footer from './Footer';
import Students from './Student/Students';
import StudentInfo from'./Student/StudentInfo';
import StudentForm from './Student/StudentForm';
import StudentsEdit from './Student/StudentsEdit';
import Campuses from './Campus/Campuses';
import CampusInfo from './Campus/CampusInfo';
import CampusForm from './Campus/CampusForm';
import CampusStudents from './Campus/CampusStudents';
import EasterEgg from './DoNotLook';
import { getCampusesFromServer } from '../store/campuses';
import { getStudentsFromServer } from '../store/students';

class App extends React.Component {
  componentDidMount() {
    const { getCampuses, getStudents } = this.props
    getCampuses()
    getStudents()
  };

  render() {
    return (
      <Router>
        <div>
        <Route path='/' component={ Nav } />
          <div className="wrapper center-all">
            <Switch>
              <Route exact path='/' render={() => <Redirect to='/home' />} />
              <Route exact path='/home' component={ Home } />
              <Route exact path='/infinityandbeyond' component={EasterEgg} />
              {/* Student Routes */}
              <Route exact path='/students' component={ Students } />
              <Route exact path='/students/create' component={ StudentForm } />
              <Route exact path='/students/edit' component={ StudentsEdit } />
              <Route exact path='/students/:id/edit' render={({ match }) => (
                <StudentForm id={ match.params.id * 1} />
              )} />
              <Route exact path='/students/:id' render={({ match }) => (
                <StudentInfo id={ match.params.id * 1} />
              )} />
              {/* Campus Routes */}
              <Route exact path='/campuses' component={ Campuses } />
              <Route exact path='/campuses/create' component={ CampusForm } />
              <Route exact path='/campuses/:id/edit' render={({ match }) => (
                <CampusForm id={match.params.id * 1} />
              )} />
              <Route exact path='/campuses/:id/students' render={({ match }) => (
                <CampusStudents id={match.params.id * 1} />
              )} />
              <Route exact path='/campuses/:id' render={({ match }) => (
                <CampusInfo id={ match.params.id * 1} />
              )} />
            </Switch>
          </div>
        <Route path='/' component={ Footer } />
        </div>
      </Router>
    )
  }
};

const mapDispatch = (dispatch) => {
  return {
    getCampuses: () => dispatch(getCampusesFromServer()),
    getStudents: () => dispatch(getStudentsFromServer())
  }
};

export default connect(null, mapDispatch)(App);
