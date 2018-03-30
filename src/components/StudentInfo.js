/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStudentFromServer } from '../store/students';

class StudentInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.setState(this.props.student)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.props = nextProps
      this.setState(nextProps.student)
    }
  }

  render() {
    const { student, campus, deleteStudent } = this.props
    if (!student) return null
    // console.log(student, campus)
    return (
      <div>
        <h1>Information for { student.full_name }</h1>
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
            <button onClick={() => deleteStudent(`${student.id}`)}className="btn btn-outline-danger">Delete</button>
          </div>

        </div>
        <div>
        {
          student.campus_id ? (
            <div>
              <h2>Campus: { campus.name }</h2>
              <img src={campus.image_url} />
            </div>
          ) : (
            <h2>No campus</h2>
          )
        }
        </div>
      </div>
    )
  }
}

const mapState = ({ students, campuses }, { id }) => {
  const student = students.find(s => s.id === id)
  const campus = student && campuses.find(c => c.id === student.campus_id)
  return { student, campus }
}

const mapDispatch = (dispatch) => {
  return {
    deleteStudent: (id) => dispatch(deleteStudentFromServer(id))
  }
}

export default connect(mapState, mapDispatch)(StudentInfo);