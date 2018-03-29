import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import studentsReducer from './students';
import campusesReducer from './campuses';

const reducer = combineReducers({
  students: studentsReducer,
  campuses: campusesReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
