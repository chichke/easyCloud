import produce from 'immer';
import { ADD_FILENAME, ADD_FILESIZE, RESET_FILENAME, RESET_FILESIZE } from '../types/file';

const initialState = {
  fileSize: 0,
  files: [],
};

const reducer = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case ADD_FILESIZE:
        draft.fileSize = state.fileSize + payload;
        break;
      case RESET_FILESIZE:
        draft.fileSize = 0;
        break;
      case ADD_FILENAME:
        draft.files.push(payload);
        break;
      case RESET_FILENAME:
        draft.files = [];
        break;
      default:
        break;
    }
    return draft;
  });

export default reducer;
