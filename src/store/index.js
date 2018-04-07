import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import studentsReducer from './students';
import campusesReducer from './campuses';
import errorReducer from './error';

const reducer = combineReducers({
  students: studentsReducer,
  campuses: campusesReducer,
  error: errorReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export * from './students';
export * from './campuses';
export * from './error';
