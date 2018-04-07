/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CampusCard from '../Campus/CampusCard';
import { deleteStudentFromServer, saveStudentOnServer } from '../../store/students';
import { Helmet } from 'react-helmet';

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
    const { students, student, campus, campuses, deleteStudent, saveStudent } = this.props
    const { campus_id } = this.state
    const { onChange, onSave } = this
    const match = student && student.campus_id === campus_id * 1 ? true : false
    if (!student) return null
    return (
      <div className="default-margins">
        <Helmet><title>Student Info</title></Helmet>

        <h1>Information for {student.full_name}</h1>

        <div className="flex border-5-20 padding-10" style={{ backgroundColor: '#f0f3f8' }}>

          <div style={{ marginRight: '20px'}}>
            <img className="border-5-20 student-image-info" src={student.image_url} />
          </div>

          <div>
            <h2>Student: {student.full_name} </h2>
            <h3>Email: {student.email}</h3>
            <h3>GPA: {student.gpa}</h3>
            <div className="flex space-btw margin-top-20">
              <Link to={`/students/${student.id}/edit`}>
                <button className="btn btn-outline-success">Edit</button>
              </Link>
              <button onClick={() => deleteStudent(`${student.id}`)} className="btn btn-outline-danger">Delete</button>
            </div>
          </div>

        </div>

        <div>
          {
            student && campus ? (
              <div>
                <h2 style={{margin: '20px 0px 15px'}}>{student.first_name} is registered to {campus.name} Campus</h2>
                <div>
                  <form style={{ margin: '0px 0px 10px'}} onSubmit={ onSave }>
                    <div className="form-row">
                      <div className="col-md-3">
                        <input className="form-control-plaintext font-weight-bold" value="Change Campus" readOnly />
                      </div>
                      <div className="col-md-6">
                        <select className="form-control" value={campus_id * 1} onChange={onChange}>
                          {
                            campuses.map(campus => (
                              <option value={campus.id * 1} key={campus.id}>{campus.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="col-md-2">
                        <button disabled={match} className={match ? ('btn btn-outline-success mb-2') : ('btn btn-success mb-2')}>Save Campus</button>
                      </div>
                    </div>
                  </form>
                  <button
                    onClick={() => saveStudent({id: student.id, campus_id: null })}
                    className="btn btn-warning">
                      Remove Campus
                  </button>
                </div>

                <CampusCard key={campus.id} campus={campus} studentCount={students.filter(student => student.campus_id === campus.id).length}/>

              </div>
            ) : (
                <div>
                  <h2 className="margin-tb-20">No campus</h2>
                  <h3>Add Campus</h3>
                  <form onSubmit={onSave}>
                    <div className="form-row">
                      <div className="col-md-2">
                        <input className="form-control-plaintext font-weight-bold" value="Add Campus" readOnly />
                      </div>
                      <div className="col-md-6">
                        <select className="form-control" value={campus_id * 1} onChange={onChange}>
                        {<option value="">Select Campus...</option>}
                          {
                            campuses.map(campus => (
                              <option value={campus.id * 1} key={campus.id}>{campus.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="col-md-2">
                        <button disabled={match} disabled={campus_id === ""} className={match ? ('btn btn-outline-success mb-2') : ('btn btn-success mb-2')}>Save Campus</button>
                      </div>
                    </div>
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
  return { students, student, campus, campuses, id }
}

const mapDispatch = (dispatch) => {
  return {
    deleteStudent: (id) => dispatch(deleteStudentFromServer(id)),
    saveStudent: (student) => dispatch(saveStudentOnServer(student))
  }
}

export default connect(mapState, mapDispatch)(StudentInfo);
