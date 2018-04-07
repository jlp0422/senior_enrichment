/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveStudentOnServer } from '../../store/students';

class StudentsEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentsToChange: [],
      campus_id: -1
    }
    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
  }

  onUpdate() {
    const { studentsToChange, campus_id } = this.state
    studentsToChange.map(id => (
      this.props.saveStudent({id: id*1, campus_id: campus_id*1}, 'massedit')
    ))
  }

  onChange(ev) {
    this.setState({campus_id: ev.target.value*1})
  }

  onCheck(ev) {
    let { studentsToChange } = this.state
    if (studentsToChange.includes(ev.target.value)) {
      studentsToChange = studentsToChange.filter(id => id*1 !== ev.target.value*1)
    }
    else {
      studentsToChange.push(ev.target.value)
    }
    this.setState({ studentsToChange })
  }

  render() {
    const { students, campuses } = this.props
    const { studentsToChange, campus_id } = this.state
    const { onChange, onCheck, onUpdate } = this
    if (!students) return null
    return (
      <div className="default-margins">
      <div className="flex space-btw center">
        <div><h1>Edit Students</h1></div>
        <div>
          <Link to='/students'>
            <button className="btn btn-secondary">Cancel Edit</button>
          </Link>
        </div>
      </div>

      <h3>Choose campus for students</h3>
      <form className="margin-bot-20">
        <select className="form-control" onChange={onChange} name="campus_id" value={campus_id}>
          <option value="-1">Select campus...</option>
          {
            campuses.map(campus => (
              <option key={campus.id} value={campus.id}>{campus.name}</option>
            ))
          }
        </select>
      </form>
      {
        students.map(student => (
          <div key={student.id} className="form-check">
            <input onChange={ onCheck } name="student" className="form-check-input" type="checkbox" value={student.id} />
            <p className="form-check-label">
              <strong>{student.full_name}</strong> ({student.campus_id && campuses ? campuses.find(campus => campus.id === student.campus_id).name : ('No campus')})
            </p>
          </div>
        ))
      }
      <button className="btn btn-success btn-pad-20" disabled={campus_id === -1 ? true : false } onClick={ onUpdate }>Update all students</button>
      </div>
    )
  }
}

const mapState = ({ students, campuses }) => {
  return { students, campuses }
}

const mapDispatch = (dispatch) => {
  return {
    saveStudent: (student, page) => dispatch(saveStudentOnServer(student, page))
  }
}

export default connect(mapState, mapDispatch)(StudentsEdit);