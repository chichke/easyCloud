import produce from 'immer';
import { END_UPLOAD, START_UPLOAD } from '../types/uploadManager';

const initialState = {
  uploadTask: undefined,
  uploading: false,
  blob: undefined,
};

const reducer = (state = initialState, { type, payload, blob }) =>
  produce(state, (draft) => {
    switch (type) {
      case START_UPLOAD:
        draft.uploadTask = payload;
        draft.uploading = true;
        draft.blob = blob;
        break;
      case END_UPLOAD:
        if (state.blob) state.blob.close();
        draft.blob = undefined;
        draft.uploading = false;
        draft.uploadTask = undefined;
        break;
      default:
        break;
    }
    return draft;
  });

export default reducer;
