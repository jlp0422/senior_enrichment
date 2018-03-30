/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class StudentForm extends React.Component {
  constructor(props) {
    super(props)
    const { student } = this.props
    // console.log(this.props)
    this.state = {
      first_name: student ? student.first_name : '',
      last_name: student ? student.last_name : '',
      email: student ? student.email : '',
      gpa: student ? student.gpa : '',
      image_url: student ? student.image_url : ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount() {
    this.setState(this.props.student)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.student)
  }

  onChange(ev) {
    const student = {}
    student[ev.target.name] = ev.target.value
    this.setState(student)
  }

  onSave(ev) {
    ev.preventDefault()
    console.log(this.state)
  }

  render() {
    const { first_name, last_name, email, gpa, image_url } = this.state
    const { student, id } = this.props
    const { onChange, onSave } = this
    return (
      <div>
        { student ? (
          <h2>Editing: {student.full_name}</h2>
        ) : (
          <h2>Create new student</h2>
        ) }
        <form onSubmit={ onSave }>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>First name</label>
              <input
                onChange={ onChange }
                name="first_name"
                value={ first_name }
                className="form-control" />
            </div>
            <div className="form-group col-md-3">
              <label>Last name</label>
              <input
                onChange={ onChange }
                name="last_name"
                value={ last_name }
                className="form-control" />
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                onChange={ onChange }
                name="email"
                value={ email }
                className="form-control" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-2">
              <label>GPA</label>
              <input
                onChange={ onChange }
                name="gpa"
                value={ gpa }
                className="form-control" />
            </div>
            <div className="form-group col-md-10">
              <label>Avatar</label>
              <input
                onChange={ onChange }
                name="image_url"
                value={ image_url }
                className="form-control" />
            </div>
          </div>
          {
            student ? (
              <button className="btn btn-success">Update Student</button>
            ) : (
              <button className="btn btn-success">Save Student</button>
            )
          }

        </form>
      </div>
    )
  }
}

const mapState = ({ students, campuses }, { id }) => {
  const student = students.find(s => s.id === id)
  return {
    student
  }
}

const mapDispatch = () => {
  return {

  }
}

export default connect(mapState, mapDispatch)(StudentForm);
