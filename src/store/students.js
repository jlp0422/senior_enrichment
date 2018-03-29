import axios from 'axios';

/* ACTION CONSTANTS */

const GET_STUDENTS = 'GET_STUDENTS';

/* ACTION CREATORS */

const getStudents = (students) => ({ type: GET_STUDENTS, students })

/* THUNKS */

export const getStudentsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/students')
      .then(res => res.data)
      .then(students => dispatch(getStudents(students)))
  }
}

/* REDUCER */

const studentsReducer = (state = [], action) => {
  switch (action.type) {

    case GET_STUDENTS:
      return action.students

    default:
      return state;
  }
}

export default studentsReducer;
