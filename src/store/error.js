/* eslint-disable */
import axios from 'axios';

/*********** ACTION CONSTANTS ***********/
const ERROR = 'ERROR'
const CLEAR_ERROR = 'CLEAR_ERROR'

/*********** ACTION CREATORS ***********/
export const error = (error) => {
  return {
    type: ERROR,
    error
  }
}

export const clearError = () => ({ type: CLEAR_ERROR })

/*********** REDUCER ***********/
const errorReducer = (state = {}, action) => {
  switch(action.type) {

    case ERROR:
      state = action.error
      break;

    case CLEAR_ERROR:
      state = {}
      break;
  }
  return state;
}

export default errorReducer;
