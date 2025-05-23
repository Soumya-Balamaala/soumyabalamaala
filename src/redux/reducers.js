// store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/Authentication';
// import more slices here

const reducers = combineReducers({
  auth: authReducer,
  // add other slices like user, ui, settings etc.
});

export default reducers;
