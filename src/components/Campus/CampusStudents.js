/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import StudentCard from '../Student/StudentCard';
import { saveStudentOnServer } from '../../store/students';
import { Helmet } from 'react-helmet';

class CampusStudents extends React.Component {
  constructor(props) {
    super(props)
    const { campus } = this.props
    this.state = {
      id: '-1',
      campus_id: ''
    }
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.setState({ campus_id: this.props.id })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ campus_id: nextProps.id })
  }

  onChange(ev) {
    const student = {}
    student[ev.target.name] = ev.target.value
    this.setState(student)
  }

  onSave(ev) {
    ev.preventDefault()
    const { id, campus_id } = this.state
    this.props.saveStudent({id, campus_id}, 'campusStudents')
  }

  render() {
    const { campus, other_students, campus_students, campuses } = this.props
    const { id } = this.state
    const { onSave, onChange } = this
    const disabled = id === "-1" ? true : false
    if (!campus) return null
    if (!other_students) return null
    return (
      <div>
        <Helmet><title>Add Students</title></Helmet>
        <h1>Add Students to {campus.name} Campus</h1>

        <form className="form-inline" onSubmit={ onSave }>

          <div className="form-group mx-sm-3 mb-2">
              <select
                name="id"
                onChange={ onChange }
                className="form-control">
                <option value="-1">Select student...</option>
                {
                  other_students.map( student => (
                    <option value={student.id} key={student.id}>{student.full_name} (
                      {campuses.find(campus => campus.id === student.campus_id).name}
                    )</option>
                  ))
                }
                </select>
            </div>
            <button className="btn btn-success mb-2" disabled={disabled}>Add to {campus.name}</button>
        </form>

        <h3>Current students at {campus.name}</h3>
        <div className="card-group">
          {
            campus_students.map(student => (
              <StudentCard key={student.id} student={student} campus={campus}/>
            ))
          }
          </div>
      </div>
    )
  }
}

const mapState = ({students, campuses}, { id }) => {
  const campus = campuses.find(campus => campus.id === id)
  const campus_students = campus && students.filter(student => student.campus_id === campus.id)
  const other_students = campus && students.filter(student => student.campus_id !== campus.id)
  return { campus_students, other_students, campus, campuses }
}

const mapDispatch = (dispatch) => {
  return {
    saveStudent: (student, page) => dispatch(saveStudentOnServer(student, page))
  }
}

export default connect(mapState, mapDispatch)(CampusStudents)
