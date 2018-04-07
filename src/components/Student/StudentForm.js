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
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.dismissError = this.dismissError.bind(this)
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
    const { id } = this.props
    const { first_name, last_name, email, gpa, image_url } = this.state
    const campus_id = this.state.campus_id * 1
    this.props.saveStudent({ id, first_name, last_name, email, gpa, image_url, campus_id })
  }

  render() {
    const { first_name, last_name, email, gpa, image_url, campus_id } = this.state
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
                className={`form-control ${error.path === 'first_name' ? `is-invalid` : ''}`} />
            </div>
            <div className="form-group col-md-3">
              <label>Last name</label>
              <input
                onChange={ onChange }
                name="last_name"
                value={ last_name }
                // required
                className={`form-control ${error.path === 'last_name' ? `is-invalid` : ''}`} />
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                onChange={ onChange }
                name="email"
                value={ email }
                type="email"
                // required
                className={`form-control ${error.path === 'email' ? `is-invalid` : ''}`} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-2">
              <label>GPA</label>
              <input
                onChange={ onChange }
                name="gpa"
                value={ gpa }
                type="number"
                // min="0"
                // max="4"
                // required
                className="form-control" />
            </div>
            <div className="form-group col-md-10">
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
