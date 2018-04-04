/* eslint-disable */
import axios from 'axios';

/*********** ACTION CONSTANTS ***********/
const GET_CAMPUSES = 'GET_CAMPUSES';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

/*********** ACTION CREATORS ***********/
const getCampuses = (campuses) => ({ type: GET_CAMPUSES, campuses })
const deleteCampus = (id) => ({ type: DELETE_CAMPUS, id })
const addCampus = (campus) => ({ type: ADD_CAMPUS, campus})
const updateCampus = (campus) => ({ type: UPDATE_CAMPUS, campus })
import { error, clearError } from './error';

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
      .then(() => location.hash = '/campuses')
  }
}

export const saveCampusOnServer = (campus, page) => {
  let camp;
  const { id } = campus
  const method = id ? 'put' : 'post'
  const url = id ? `/api/campuses/${id}` : '/api/campuses'
  const action = id ? updateCampus : addCampus
  return (dispatch) => {
    return axios[method](url, campus)
      .then( res => res.data)
      .then( _campus => {
        camp = _campus
        return dispatch(action(_campus))
        // return {_campus, page}
      })
      .then(() => {
        if (page === 'simple') location.hash = `/campuses/${camp.id}/edit`
        else location.hash = `/campuses/${camp.id}`
      })
      .catch(err => dispatch(error(err.response.data)))
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
      state = campuses
      break;

    case UPDATE_CAMPUS:
      const otherCampuses = state.filter(campus => campus.id !== action.campus.id * 1)
      state = [...otherCampuses, action.campus ]
      break;

    case ADD_CAMPUS:
      state = [ ...state, action.campus ]

  }
  return state
}

export default campusesReducer;
