/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class StudentsEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      studentsToChange: [],
      campus_id: '-1'
    }
    this.onChange = this.onChange.bind(this)
    this.onCheck = this.onCheck.bind(this)
  }

  onChange(ev) {
    this.setState({campus_id: ev.target.value*1})
  }

  onCheck(ev) {
    const { studentsToChange } = this.state
    // add ability to:
    // if student is not in array, add to array
    // if student is in array, remove from array
    studentsToChange.push(ev.target.value)
    this.setState({ studentsToChange })
  }

  render() {
    const { students, campuses } = this.props
    const { studentsToChange, campus_id } = this.state
    const { onChange, onCheck } = this
    console.log(this.state)
    return (
      <div>
      <h1>Edit Students</h1>
      <button>Cancel Edit</button>
      <h3>Choose campus for students</h3>
      <form>
        <select onChange={onChange} name="campus_id" value={campus_id}>
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
            <label className="form-check-label">
              {student.full_name}
            </label>
          </div>
        ))
      }
      <button>Update all students</button>
      </div>
    )
  }
}

const mapState = ({ students, campuses }) => {
  return { students, campuses }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(StudentsEdit);
