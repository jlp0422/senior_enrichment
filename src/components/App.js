/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Nav from './Nav';
import Students from './Students';
import StudentInfo from'./StudentInfo';
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
          <Switch>
            <Route exact path='/students' component={ Students } />
            <Route exact path='/students/:id' render={({ match }) => (
              <StudentInfo id={ match.params.id * 1} />
            )} />
          </Switch>
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
