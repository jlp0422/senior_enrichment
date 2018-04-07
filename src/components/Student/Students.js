/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentCard from './StudentCard';
import { Helmet } from 'react-helmet';
import { sortStudents } from '../../store/students'

class Students extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      campus_id: '-1',
      sort_method: 'sortLastName'
    }
    this.onChange = this.onChange.bind(this)
    this.onChangeSort = this.onChangeSort.bind(this)
  }

  onChange(ev) {
    const obj = {}
    obj[ev.target.name] = ev.target.value
    this.setState( obj )
  }

  onChangeSort(ev) {
    const obj = {}
    obj[ev.target.name] = ev.target.value
    this.setState(obj)
    this.props.sort(this.state.sort_method)
  }

  render() {
    // console.log(this.state.sort_method)
    const { students, campuses } = this.props
    const { name, campus_id, sort_method } = this.state
    const { onChange, onChangeSort } = this
    const matching = students.reduce((memo, student) => {
      if (student.full_name.toLowerCase().match(name.toLowerCase())) {
        return memo.concat(student)
      }
      return memo
    }, [])
    return (
      <div className="default-margins">
        <Helmet><title>All Students</title></Helmet>

        <div className="flex space-btw center margin-bot-20 student-bar">
          <div>
            <h1>All Students</h1>
          </div>
          <div>
            <input
              placeholder="Search for a student"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div>
            <Link to='/students/edit'>
              <button className="btn btn-success btn-block-bar">Edit Students</button>
            </Link>
          </div>
          <div>
            <Link to='/students/create'>
              <button className="btn btn-primary">Add Student</button>
            </Link>
          </div>
        </div>
        {
          students.length ? (
            <div>
              <form className="margin-bot-20">
                <div className="form-row">
                  <h3 className="col-md-4">View students for: </h3>
                  <select className="form-control col-md-8" onChange={ onChange } value={ campus_id } name="campus_id">
                    <option value='-1'>All Campuses</option>
                    {
                      campuses.map(campus => (
                        <option key={campus.id} value={campus.id}>{campus.name}</option>
                      ))
                    }
                  </select>
                </div>
              </form>
              <form className="margin-bot-20">
                <div className="form-row">
                  <h3 className="col-md-4">Sort by</h3>
                  <select className="form-control col-md-8" onChange={onChangeSort} value={sort_method} name="sort_method">
                    <option value='sortLastName'>Last name</option>
                    <option value='sortGPA'>GPA</option>
                  </select>
                </div>
              </form>
              <div className="card-group">
                {
                  students && campuses &&
                  matching.map(student => (
                    campus_id === '-1' ?
                      <StudentCard key={student.id} student={student} campus={campuses.find(campus => campus.id === student.campus_id)} />
                      :
                      student.campus_id*1 === campus_id*1? (
                        <StudentCard key={student.id} student={student} campus={campuses.find(campus => campus.id === student.campus_id)} />
                      ) : (
                        null
                      )
                  ))
                }
              </div>

            </div>
          ) : (
              <div className="margin-top-20 text-center">
                <h2 className="pad-bot-20">We don't have any students.</h2>
                <Link to='/students/create'>
                  <button className="btn btn-primary">Add Student</button>
                </Link>
              </div>
          )
        }
        {
          !matching.length && name && students.length ? (
            <div className="margin-top-20 text-center">
              <h2 className="pad-bot-20">No students match that search.</h2>
              <Link to='/students/create'>
                <button className="btn btn-primary">Add Student</button>
              </Link>
            </div>
          ) : (
            null
          )
        }
    </div>
    )
  }
}

const mapState = ({ students, campuses }) => {
  return { students, campuses }
}

const mapDispatch = (dispatch) => {
  return {
    sort: (sortType) => dispatch(sortStudents(sortType))
  }
}

export default connect(mapState, mapDispatch)(Students);
