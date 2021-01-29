import firebase from '../../firebase';
import { END_UPLOAD, START_UPLOAD } from '../types/uploadManager';

export const setFile = (blob, isPP = false, filename = undefined) => (dispatch) => {
  const { uid } = firebase.auth().currentUser;

  const name = filename ?? `${new Date().getTime()}-easyCloud`;

  try {
    console.log('before upload task');
    const uploadTask = firebase.storage().ref(`users/${uid}/${name}`).put(blob);

    console.log('after uploadTask');
    dispatch({ type: START_UPLOAD, payload: uploadTask, blob, isPP });
  } catch (error) {
    console.log(error);
  }
};

export const finish = () => (dispatch) => {
  dispatch({ type: END_UPLOAD });
};

// TODO ADD MORE
