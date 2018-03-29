/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Nav from './Nav';
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
        <Route to='/' component={ Nav } />
          <Switch>
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
