/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudentFromServer, saveStudentOnServer } from '../store/students';

class StudentInfo extends React.Component {
  constructor(props) {
    super(props)
    const { campus } = this.props
    this.state = {
      campus_id: campus ? campus.id : ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  componentDidMount() {
    this.props.campus ? this.setState({campus_id: this.props.campus.id}) : null
  }

  componentWillReceiveProps(nextProps) {
    nextProps.campus ? this.setState({ campus_id: nextProps.campus.id}) : null
  }

  onChange(ev) {
    const campus_id = ev.target.value
    this.setState({ campus_id })
  }

  onSave(ev) {
    ev.preventDefault()
    const { id } = this.props
    const { campus_id } = this.state
    this.props.saveStudent({id, campus_id: campus_id*1 })
  }

  render() {
    const { student, campus, campuses, deleteStudent } = this.props
    const { campus_id } = this.state
    const { onChange, onSave } = this
    const match = student && student.campus_id === campus_id * 1 ? true : false
    if (!student) return null
    return (
      <div>
       <h1>Information for {student.full_name}</h1>
        <div className="student-info">
          <div>
            <img src={student.image_url} />
          </div>
          <div>
            <h2>Student: {student.full_name} </h2>
            <h3>Email: {student.email}</h3>
            <h3>GPA: {student.gpa}</h3>
            <Link to={`/students/${student.id}/edit`}>
              <button className="btn btn-outline-success">Edit</button>
            </Link>&nbsp;&nbsp;
          <button onClick={() => deleteStudent(`${student.id}`)} className="btn btn-outline-danger">Delete</button>
          </div>

        </div>
        <div>
          {
            student && campus ? (
              <div>
                <h2>{student.first_name} is registered to {campus.name} Campus</h2>

                <form className="form-inline" onSubmit={ onSave }>
                  <div className="form-group mb-2">
                    <label>Change Campus</label>
                  </div>
                  <div className="form-group mx-sm-3 mb-2">
                    <select className="form-control" value={campus_id * 1} onChange={onChange}>
                      {
                        campuses.map(campus => (
                          <option value={campus.id * 1} key={campus.id}>{campus.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <button disabled={match} className={match ? ('btn btn-outline-success mb-2') : ('btn btn-success mb-2')}>Save Campus</button>
                </form>

                <img src={campus.image_url} />

              </div>
            ) : (
                <div>
                  <h2>No campus</h2>
                  <h3>Add Campus</h3>
                  <form className="form-inline" onSubmit={onSave}>
                    <div className="form-group mb-2">
                      <label>Change Campus</label>
                    </div>
                    <div className="form-group mx-sm-3 mb-2">
                      <select className="form-control" value={campus_id * 1} onChange={onChange}>
                      {/*<option>Select Campus</option>*/}
                        {
                          campuses.map(campus => (
                            <option value={campus.id * 1} key={campus.id}>{campus.name}</option>
                          ))
                        }
                      </select>
                    </div>
                    <button disabled={match} className={match ? ('btn btn-outline-success mb-2') : ('btn btn-success mb-2')}>Save Campus</button>
                  </form>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

const mapState = ({ students, campuses }, { id }) => {
  const student = students && students.find(s => s.id === id)
  const campus = campuses && student && campuses.find(c => c.id === student.campus_id)
  return { student, campus, campuses, id }
}

const mapDispatch = (dispatch) => {
  return {
    deleteStudent: (id) => dispatch(deleteStudentFromServer(id)),
    saveStudent: (student) => dispatch(saveStudentOnServer(student))
  }
}

export default connect(mapState, mapDispatch)(StudentInfo);
