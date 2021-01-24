import firebase from '../firebase';

export default () =>
  new Promise((resolve, reject) => {
    const { uid } = firebase.auth().currentUser;

    firebase
      .database()
      .ref(`users/${uid}`)
      .once(
        'value',
        (res) => {
          resolve(res.val());
        },
        (err) => {
          reject(err.message);
        }
      );
  });
