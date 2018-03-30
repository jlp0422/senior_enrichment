/* eslint-disable */
import axios from 'axios';

/*********** ACTION CONSTANTS ***********/
const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

/*********** ACTION CREATORS ***********/
const getCampuses = (campuses) => ({ type: GET_CAMPUSES, campuses })
const deleteCampus = (id) => ({ type: DELETE_CAMPUS, id })

/*********** THUNKS ***********/
export const getCampusesFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/campuses')
      .then( res => res.data)
      .then( campuses => dispatch(getCampuses(campuses)))
  }
}

export const deleteCampusOnServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/campuses/${id}`)
      .then( res => res.data)
      .then( campuses => dispatch(deleteCampus(id)))
  }
}

/*********** REDUCER ***********/
const campusesReducer = (state = [], action) => {
  switch (action.type) {

    case GET_CAMPUSES:
      state = action.campuses
      break;

    case DELETE_CAMPUS:
      const campuses = state.filter(campus => campus.id !== action.id * 1)
      return campuses
      break;

  }
  return state
}

export default campusesReducer;
