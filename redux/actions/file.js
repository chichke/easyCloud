import { ADD_FILENAME, ADD_FILESIZE, RESET_FILENAME, RESET_FILESIZE } from '../types/file';

export const addFileSize = (fileSize) => (dispatch) => {
  dispatch({ type: ADD_FILESIZE, payload: fileSize });
};

export const resetFileSize = () => (dispatch) => {
  dispatch({ type: RESET_FILESIZE });
};

export const addFile = (filename) => (dispatch) => {
  dispatch({ type: ADD_FILENAME, payload: filename });
};

export const resetFilenames = () => (dispatch) => {
  dispatch({ type: RESET_FILENAME });
};
