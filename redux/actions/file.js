import { ADD_FILE, RESET_FILES } from '../types/file';

export const addFile = (key, name, size) => (dispatch) => {
  dispatch({ type: ADD_FILE, key, name, size });
};

export const resetFiles = () => (dispatch) => {
  dispatch({ type: RESET_FILES });
};
