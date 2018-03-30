/* eslint-disable */
import axios from 'axios';

/* ACTION CONSTANTS */

const GET_CAMPUSES = 'GET_CAMPUSES';

/* ACTION CREATORS */

const getCampuses = (campuses) => ({ type: GET_CAMPUSES, campuses })

/* THUNKS */

export const getCampusesFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/campuses')
      .then( res => res.data)
      .then( campuses => dispatch(getCampuses(campuses)))
  }
}

/* REDUCER */

const campusesReducer = (state = [], action) => {
  switch (action.type) {

    case GET_CAMPUSES:
      state = action.campuses
      break;

  }
  return state
}

export default campusesReducer;
