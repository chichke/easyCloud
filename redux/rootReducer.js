import { combineReducers } from 'redux';
import fileSize from './reducers/fileSize';
import uploadManager from './reducers/uploadManager';

export default combineReducers({
  uploadManager,
  fileSize,
  // TODO Add reducers
});
