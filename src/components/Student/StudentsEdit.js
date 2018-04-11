/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { saveStudentOnServer, deleteStudentFromServer } from '../../store/students';

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
    this.onDelete = this.onDelete.bind(this)
    this.onRemoveCampus = this.onRemoveCampus.bind(this)
  };

  // removed confirm pop-up for onUpdate, onDelete, and onRemoveCampus, does not work on mobile
  onUpdate() {
    const { studentsToChange, campus_id } = this.state
    studentsToChange.map(id => this.props.saveStudent({id: id*1, campus_id: campus_id*1}, 'massedit'))
  };

  onDelete() {
    const {studentsToChange} = this.state
    studentsToChange.map(id => this.props.deleteStudent(id))
  };

  onRemoveCampus() {
    const { studentsToChange } = this.state
    studentsToChange.map(id => this.props.saveStudent({ id: id * 1, campus_id: null }, 'massedit'))
  };

  onChange(ev) {
    this.setState({campus_id: ev.target.value*1})
  };

  onCheck(ev) {
    let { studentsToChange } = this.state
    if (studentsToChange.includes(ev.target.value)) {
      studentsToChange = studentsToChange.filter(id => id*1 !== ev.target.value*1)
    }
    else {
      studentsToChange.push(ev.target.value)
    }
    this.setState({ studentsToChange })
  };

  render() {
    const { students, campuses } = this.props
    const { studentsToChange, campus_id } = this.state
    const { onChange, onCheck, onUpdate, onDelete, onRemoveCampus } = this
    if (!students || !campuses) return null
    console.log(students.map(student => student.campus_id))
    console.log(campuses.map(campus => campus.id))
    return (
      <div className="default-margins">
        <Helmet><title>Edit Students</title></Helmet>

        <div className="flex space-btw center">
          <div><h1>Edit Students</h1></div>
          <div>
            <Link to='/students'>
              <button className="btn btn-secondary">Cancel Edit</button>
            </Link>
          </div>
        </div>

        <h3 className="margin-tb-10">Choose campus for students</h3>
        <form className="margin-bot-10">
          <select className="form-control" onChange={onChange} name="campus_id" value={campus_id}>
            <option value="-1">Select campus...</option>
            {
              campuses.map(campus => (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              ))
            }
          </select>
        </form>
        <div className="flex flex-600 margin-tb-10">
          <div className="margin-r-20">
            <button className="btn btn-success btn-block-600" disabled={campus_id === -1 || studentsToChange.length === 0 ? true : false} onClick={onUpdate}>
              Transfer selected students
            </button>
          </div>
          <div className="margin-r-20">
            <button className="btn btn-danger" disabled={studentsToChange.length ? false : true} onClick={onDelete}>
              Delete selected students
            </button>
          </div>
          <div>
            <button className="btn btn-warning btn-block-600" disabled={studentsToChange.length ? false : true} onClick={ onRemoveCampus }>
              Unenroll selected students
            </button>
          </div>
        </div>
        {
          students.map(student => (
            <div key={student.id} className="form-check">
              <input onChange={ onCheck } name="student" className="form-check-input" type="checkbox" value={student.id} />
              <p className="form-check-label">
                <strong>&nbsp;{student.full_name}</strong> ({student && campuses && student.campus_id ? campuses.find(campus => campus.id === student.campus_id).name : ('No campus')})
              </p>
            </div>
          ))
        }
      </div>
    )
  }
};

const mapState = ({ students, campuses }) => {
  return { students, campuses }
};

const mapDispatch = (dispatch) => {
  return {
    saveStudent: (student, page) => dispatch(saveStudentOnServer(student, page)),
    deleteStudent: (id) => dispatch(deleteStudentFromServer(id))
  }
};

export default connect(mapState, mapDispatch)(StudentsEdit);
