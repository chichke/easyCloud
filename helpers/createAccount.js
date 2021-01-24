import firebase from '../firebase';

const addUserMetadata = (formData) => {
  const { uid } = firebase.auth().currentUser;
  const { first, last, phone } = formData;
  firebase.database().ref(`/users/${uid}`).set({ first, last, phone });
};
export default (formData) =>
  new Promise((resolve, reject) => {
    const { mail, pass } = formData;
    firebase
      .auth()
      .createUserWithEmailAndPassword(mail, pass)
      .then((res) => {
        addUserMetadata(formData);
        resolve(res);
      })
      .catch((res) => {
        reject(res);
      });
  });
