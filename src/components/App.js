/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Nav from './Nav';
import Students from './Students';
import StudentInfo from'./StudentInfo';
import StudentForm from './StudentForm';
import Campuses from './Campuses';
import CampusInfo from './CampusInfo';
import CampusForm from './CampusForm';
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
          <div className="container">
            <Switch>
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
            {/*  <Route exact path='/campuses/create' component={ CampusForm } />
              <Route exact path='/campuses/:id/edit' render={({ match }) => (
                <CampusForm id={match.params.id * 1} />
              )} /> */}
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
