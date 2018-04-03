/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveStudentOnServer } from '../../store/students';
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
      campus_id: student ? student.campus_id : ''
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
    const { id } = this.props
    const { first_name, last_name, email, gpa, image_url, campus_id } = this.state
    this.props.saveStudent({ id, first_name, last_name, email, gpa, image_url, campus_id })
  }

  render() {
    const { first_name, last_name, email, gpa, image_url, campus_id } = this.state
    const { student, id, campuses } = this.props
    const { onChange, onSave } = this
    const match = student && student.first_name === first_name && student.last_name === last_name && student.email === email && student.gpa*1 === gpa*1 && student.image_url === image_url && student.campus_id*1 === campus_id*1 ? true : false
    return (
      <div style={{ margin: '0px 10px 40px' }}>
        <Helmet><title>{ student ? ('Edit Student') : ('Add Student')}</title></Helmet>
          { student ? (
            <h1>Editing: {student.full_name}</h1>
          ) : (
            <h1>Add new student</h1>
          ) }
        <form onSubmit={ onSave }>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>First name</label>
              <input
                onChange={ onChange }
                name="first_name"
                value={ first_name }
                required
                className="form-control" />
            </div>
            <div className="form-group col-md-3">
              <label>Last name</label>
              <input
                onChange={ onChange }
                name="last_name"
                value={ last_name }
                required
                className="form-control" />
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                onChange={ onChange }
                name="email"
                value={ email }
                required
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
                required
                className="form-control" />
            </div>

            <div className="form-group col-md-10">
              <label>Campus</label>
              <select
                onChange={onChange}
                name="campus_id"
                value={campus_id}
                className="form-control">
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
                <button disabled={match} className="btn btn-success">Update Student</button>
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

const mapState = ({ students, campuses }, { id }) => {
  const student = students.find(s => s.id === id)
  return { student, id, campuses }
}

const mapDispatch = (dispatch) => {
  return {
    saveStudent: (student) => dispatch(saveStudentOnServer(student))
  }
}

export default connect(mapState, mapDispatch)(StudentForm);
