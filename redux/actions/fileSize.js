import { ADD_FILESIZE, RESET_FILESIZE } from '../types/fileSize';

export const addFileSize = (fileSize) => (dispatch) => {
  console.log('addFileSize', fileSize);
  dispatch({ type: ADD_FILESIZE, payload: fileSize });
};

export const resetFileSize = () => (dispatch) => {
  console.log('resetFileSize');
  dispatch({ type: RESET_FILESIZE });
};

// TODO ADD MORE
