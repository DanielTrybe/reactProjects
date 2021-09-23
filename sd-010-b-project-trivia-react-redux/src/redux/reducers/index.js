import { combineReducers } from 'redux';
import user from './user';

const rootReducers = combineReducers({ user });
// user é o loginreducer
export default rootReducers;
