import produce from 'immer';
import { ADD_FILESIZE, RESET_FILESIZE } from '../types/fileSize';

const initialState = {
  fileSize: 0,
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
      default:
        break;
    }
    return draft;
  });

export default reducer;
