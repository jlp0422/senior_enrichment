/* eslint-disable */
import axios from 'axios';

/* ACTION CONSTANTS */

const GET_STUDENTS = 'GET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT'

/* ACTION CREATORS */

const getStudents = (students) => ({ type: GET_STUDENTS, students })
const deleteStudent = (id) => ({ type: DELETE_STUDENT, id })

/* THUNKS */

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

/* REDUCER */

const studentsReducer = (state = [], action) => {
  switch (action.type) {

    case GET_STUDENTS:
      state = action.students
      break;

    case DELETE_STUDENT:
      const students = state.filter(student => student.id !== action.id * 1)
      state = students;
      break;


  }
  return state
}

export default studentsReducer;
