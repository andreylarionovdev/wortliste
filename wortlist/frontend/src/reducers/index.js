import { combineReducers } from 'redux';
import words from './words';
import errors from './errors';

export default combineReducers({
  words,
  errors,
});
