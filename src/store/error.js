/* eslint-disable */
import axios from 'axios';

/*********** ACTION CONSTANTS ***********/
const ERROR = 'ERROR'
const CLEAR_ERROR = 'CLEAR_ERROR'

/*********** ACTION CREATORS ***********/
export const error = (error) => ({ type: ERROR, error })
export const clearError = (clear) => ({ type: CLEAR_ERROR, clear })

/*********** REDUCER ***********/
const errorReducer = (state = {}, action) => {
  switch(action.type) {

    case ERROR:
      state = action.error
      break;

    case CLEAR_ERROR:
      state = action.clear
      break;
  }
  return state;
}

export default errorReducer;
