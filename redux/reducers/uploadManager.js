import produce from 'immer';
import { END_UPLOAD, START_UPLOAD } from '../types/uploadManager';

const initialState = {
  uploadTask: undefined,
  uploading: false,
  blob: undefined,
  isPP: false,
};

const reducer = (state = initialState, { type, payload, blob, isPP }) =>
  produce(state, (draft) => {
    switch (type) {
      case START_UPLOAD:
        draft.uploadTask = payload;
        draft.uploading = true;
        draft.blob = blob;
        draft.isPP = isPP;
        break;
      case END_UPLOAD:
        if (state.blob) state.blob.close();
        draft.blob = undefined;
        draft.uploading = false;
        draft.uploadTask = undefined;
        draft.isPP = false;
        break;
      default:
        break;
    }
    return draft;
  });

export default reducer;
