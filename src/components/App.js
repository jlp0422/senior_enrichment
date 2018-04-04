/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Students from './Student/Students';
import StudentInfo from'./Student/StudentInfo';
import StudentForm from './Student/StudentForm';
import Campuses from './Campus/Campuses';
import CampusInfo from './Campus/CampusInfo';
import CampusForm from './Campus/CampusForm';
import CampusSimpleForm from './Campus/CampusSimpleForm'
import CampusStudents from './Campus/CampusStudents';
import { getCampusesFromServer } from '../store/campuses';
import { getStudentsFromServer } from '../store/students';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { getCampuses, getStudents } = this.props
    getCampuses()
    getStudents()
  }

  render() {
    return (
      <Router>
        <div>
        <Route path='/' component={ Nav } />
          <div className="wrapper">
            <Switch>
              <Route exact path='/' component={ Home } />
              {/* Student Routes */}
              <Route exact path='/students' component={ Students } />
              <Route exact path='/students/create' component={ StudentForm } />
              <Route exact path='/students/:id/edit' render={({ match }) => (
                <StudentForm id={ match.params.id * 1} />
              )} />
              <Route exact path='/students/:id' render={({ match }) => (
                <StudentInfo id={ match.params.id * 1} />
              )} />
              {/* Campus Routes */}
              <Route exact path='/campuses' component={ Campuses } />
              <Route exact path='/campuses/create' component={ CampusSimpleForm } />
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
        </div>
      </Router>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCampuses: () => dispatch(getCampusesFromServer()),
    getStudents: () => dispatch(getStudentsFromServer())
  }
}

export default connect(null, mapDispatch)(App);
