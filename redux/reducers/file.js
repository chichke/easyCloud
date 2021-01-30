import produce from 'immer';
import { ADD_FILE, RESET_FILES } from '../types/file';

const initialState = {
  fileSize: 0,
  files: [],
  keys: [],
};

const reducer = (state = initialState, { type, name, size, key }) =>
  produce(state, (draft) => {
    let fileAlreadyCached = false;

    switch (type) {
      case ADD_FILE:
        state.keys.forEach((stateKey) => {
          if (stateKey === key) fileAlreadyCached = true;
        });

        if (fileAlreadyCached) return draft;

        draft.keys.push(key);
        draft.files.push(name);
        draft.fileSize = state.fileSize + size;
        break;
      case RESET_FILES:
        draft.keys = [];
        draft.files = [];
        draft.fileSize = 0;
        break;
      default:
        break;
    }
    return draft;
  });

export default reducer;
