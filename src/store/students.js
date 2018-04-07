/* eslint-disable */
import axios from 'axios';

/* ********** ACTION CONSTANTS **************/

const GET_STUDENTS = 'GET_STUDENTS';
const DELETE_STUDENT = 'DELETE_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
import { error, clearError } from './error';

/************ ACTION CREATORS **************/

const getStudents = (students) => ({ type: GET_STUDENTS, students })
const deleteStudent = (id) => ({ type: DELETE_STUDENT, id })
const addStudent = (student) => ({ type: ADD_STUDENT, student })
const updateStudent = (student) => ({ type: UPDATE_STUDENT, student })

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

export const saveStudentOnServer = (student, page) => {
  let stud;
  const { id } = student
  const method = id ? 'put' : 'post';
  const url = id ? `/api/students/${id}` : '/api/students'
  const action = id ? updateStudent : addStudent
  return (dispatch) => {
    return axios[method](url, student)
      .then( res => res.data)
      .then( _student => {
        stud = _student
        return dispatch(action(_student))
      })
      .then(() => {
        if (page === 'campusStudents') return location.hash = `/campuses/${stud.campus_id}`
        if (page === 'massedit') return location.hash = '/students'
        else location.hash = `/students/${stud.id}`
      })
      .catch(err => dispatch(error(err.response.data)))
  }
}

/************ SORTING STUDENTS BY LAST NAME ************/
function alphabetize(a, b) {
  const studentA = a.last_name.toUpperCase()
  const studentB = b.last_name.toUpperCase()
  let comparison = 0;
  if (studentA > studentB) comparison = 1
  else if (studentA < studentB) comparison = -1
  return comparison
}

/************ REDUCER ************/
const studentsReducer = (state = [], action) => {
  switch (action.type) {

    case GET_STUDENTS:
      state = action.students.sort(alphabetize)
      break;

    case DELETE_STUDENT:
      state = state.filter(student => student.id !== action.id * 1)
      state = state.sort(alphabetize)
      break;

    case ADD_STUDENT:
      state = [ ...state, action.student ].sort(alphabetize)
      break;

    case UPDATE_STUDENT:
      const students = state.filter(s => s.id !== action.student.id * 1)
      state = [...students, action.student].sort(alphabetize)
      break;

  }
  return state
}

export default studentsReducer;
