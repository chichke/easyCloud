import { combineReducers } from 'redux';
import file from './reducers/file';
import uploadManager from './reducers/uploadManager';

export default combineReducers({
  uploadManager,
  file,
  // TODO Add reducers
});
