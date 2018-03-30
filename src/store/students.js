/* eslint-disable */
import axios from 'axios';

/* ********** ACTION CONSTANTS **************/

const GET_STUDENTS = 'GET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';

/************ ACTION CREATORS **************/

const getStudents = (students) => ({ type: GET_STUDENTS, students })
const deleteStudent = (id) => ({ type: DELETE_STUDENT, id })
const addStudent = (student) => ({ type: ADD_STUDENT, student })

/************ THUNKS **************/

export const getStudentsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(getStudents(students)))
  }
}

export const deleteStudentFromServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/students/${id}`)
      .then(() => dispatch(deleteStudent(id)))
      .then(() => location.hash = '/students')
  }
}

export const addStudentOnServer = (student) => {
  return (dispatch) => {
    return axios.post('/api/students', student)
      .then( res => res.data)
      .then( _student => {
        console.log(_student)
        dispatch(addStudent(_student))
        return _student
      })
      .then( _student => location.hash = `/students/${_student.id}`)
  }
}

/************ REDUCER ************/
const studentsReducer = (state = [], action) => {
  switch (action.type) {

    case GET_STUDENTS:
      state = action.students
      break;

    case DELETE_STUDENT:
      const students = state.filter(student => student.id !== action.id * 1)
      state = students;
      break;

    case ADD_STUDENT:
      state = [ ...state, action.student ]
      break;

  }
  return state
}

export default studentsReducer;
