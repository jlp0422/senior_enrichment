/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
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
          <Switch>
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    state
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCampuses: () => dispatch(getCampusesFromServer()),
    getStudents: () => dispatch(getStudentsFromServer())
  }
}

export default connect(mapState, mapDispatch)(App);
