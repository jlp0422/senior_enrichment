/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveStudentOnServer } from '../../store/students';
import { clearError } from '../../store/error'
import { Helmet } from 'react-helmet';

class StudentForm extends React.Component {
  constructor(props) {
    super(props)
    const { student } = this.props
    this.state = {
      first_name: student ? student.first_name : '',
      last_name: student ? student.last_name : '',
      email: student ? student.email : '',
      gpa: student ? student.gpa : '',
      image_url: student ? student.image_url : '',
      campus_id: student ? student.campus_id : '',
      error: null,
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.dismissError = this.dismissError.bind(this)
    this.validators = {
      first_name: (value) => {
        if (!value) return 'Please enter a first name.'
      },
      last_name: (value) => {
        if (!value) return 'Please enter a last name.'
      },
      email: (value) => {
        if (!value) return 'Please enter an email address.'
      },
      gpa: (value) => {
        if (!value) return 'Please enter a valid GPA.'
        if (value > 4) return 'Please enter a GPA below 4.'
        if (value < 0) return 'Please enter a GPA above 0.'
      }
    }
  }

  componentDidMount() {
    this.setState(this.props.student)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.student)
  }

  dismissError() {
    this.props.clearError({})
  }

  onChange(ev) {
    const student = {}
    student[ev.target.name] = ev.target.value
    this.setState(student)
  }

  onSave(ev) {
    ev.preventDefault()
    // ERROR HANDLING
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key]
      const value = this.state[key]
      const error = validator(value)
      if (error) memo[key] = error
      return memo
    }, {})
    this.setState({ errors })
    if (Object.keys(errors).length) return;
    const { id } = this.props
    const { first_name, last_name, email, gpa, image_url } = this.state
    const campus_id = this.state.campus_id * 1
    this.props.saveStudent({ id, first_name, last_name, email, gpa, image_url, campus_id })
  }

  render() {
    const { first_name, last_name, email, gpa, image_url, campus_id, errors } = this.state
    const { student, id, campuses, error } = this.props
    const { onChange, onSave, dismissError } = this
    const match = (student && student.first_name === first_name && student.last_name === last_name && student.email === email && student.gpa*1 === gpa*1 && student.image_url === image_url && student.campus_id*1 === campus_id*1) || campus_id === '-1' ? true : false
    return (
      <div className="default-margins">
        <Helmet><title>{ student ? ('Edit Student') : ('Add Student')}</title></Helmet>
          { student ? (
            <h1>Editing: {student.full_name}</h1>
          ) : (
            <h1>Add new Student</h1>
          ) }
          {
            error.message ? (
            <div className="alert alert-danger alert-dismissible" role="alert">
              <strong>Something went wrong:</strong> {error.message}.
                <button type="button" className="close">
                <span onClick={ dismissError }>&times;</span>
              </button>
            </div>
            ) : (
              null
            )
          }
        <form className="margin-top-20" onSubmit={ onSave }>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>First name</label>
              <input
                onChange={ onChange }
                name="first_name"
                value={ first_name }
                // required
                className={`form-control ${errors.first_name ? `is-invalid` : ''}`} />
                <div className="text-danger">{errors.first_name}</div>
            </div>
            <div className="form-group col-md-3">
              <label>Last name</label>
              <input
                onChange={ onChange }
                name="last_name"
                value={ last_name }
                // required
                className={`form-control ${errors.last_name ? `is-invalid` : ''}`} />
              <div className="text-danger">{errors.last_name}</div>
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                onChange={ onChange }
                name="email"
                value={ email }
                // required
                className={`form-control ${errors.email ? `is-invalid` : ''}`} />
              <div className="text-danger">{errors.email}</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-3">
              <label>GPA</label>
              <input
                onChange={ onChange }
                name="gpa"
                value={ gpa }
                // required
                className={`form-control ${errors.gpa ? `is-invalid` : ''}`}  />
              <div className="text-danger">{errors.gpa}</div>
            </div>
            <div className="form-group col-md-9">
              <label>Campus</label>
              <select
                onChange={onChange}
                name="campus_id"
                value={campus_id}
                className="form-control">
                <option value="-1">Select campus...</option>
                {
                  campuses.map(campus => (
                    <option key={campus.id} value={campus.id}>{campus.name}</option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
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
              <div>
                <button className="btn btn-success">Update Student</button>
                <br /> <br />
                <Link to={`/students/${student.id}`}>
                  <button className="btn btn-secondary">Cancel Edit</button>
                </Link>
              </div>
            ) : (
              <button className="btn btn-success">Save Student</button>
            )
          }
        </form>
      </div>
    )
  }
}

const mapState = ({ students, campuses, error }, { id }) => {
  const student = students.find(s => s.id === id)
  return { student, id, campuses, error }
}

const mapDispatch = (dispatch) => {
  return {
    saveStudent: (student) => dispatch(saveStudentOnServer(student)),
    clearError: (clear) => dispatch(clearError(clear))
  }
}

export default connect(mapState, mapDispatch)(StudentForm);
