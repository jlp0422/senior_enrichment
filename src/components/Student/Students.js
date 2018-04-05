/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentCard from './StudentCard';
import { Helmet } from 'react-helmet';

class Students extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value})
  }

  render() {
    const { students, campuses } = this.props
    const { name } = this.state
    const { onChange } = this
    const matching = students.reduce((memo, student) => {
      if (student.full_name.toLowerCase().match(name.toLowerCase())) {
        return memo.concat(student)
      }
      return memo
    }, [])
    return (
      <div style={{ margin: '0px 10px 60px' }}>
        <Helmet><title>All Students</title></Helmet>

        <div className="flex" style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h1>All Students</h1>
          </div>
          <div>
            <input
              placeholder="Search for a student"
              className="form-control"
              value={name}
              onChange={onChange}
            />
          </div>
          <div>
            <Link to='/students/create'>
              <button className="btn btn-primary">Add Student</button>
            </Link>
          </div>
        </div>
        {
          students.length ? (
            <div className="card-group">
              {
                students && campuses &&
                matching.map(student => (
                  <StudentCard key={student.id} student={student} campus={campuses.find(campus => campus.id === student.campus_id)} />
                ))
              }
            </div>
          ) : (
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h2 style={{ paddingBottom: '20px' }}>We don't have any students.</h2>
                <Link to='/students/create'>
                  <button className="btn btn-primary">Add Student</button>
                </Link>
              </div>
          )
        }
        {
          matching.length ? (null) : (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <h2 style={{ paddingBottom: '20px' }}>No students match that search.</h2>
              <Link to='/students/create'>
                <button className="btn btn-primary">Add Student</button>
              </Link>
            </div>
          )
        }
    </div>
    )
  }
}

const mapState = ({ students, campuses }) => {
  return { students, campuses }
}

export default connect(mapState)(Students);
