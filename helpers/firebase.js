import firebase from '../firebase';

const addUserMetadata = (formData) => {
  const { uid } = firebase.auth().currentUser;
  const { first, last, phone } = formData;
  const pp = `https://robohash.org/${uid}`;

  firebase.database().ref(`/users/${uid}`).set({ first, last, phone, pp });
};
export const createAccount = (formData) =>
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

export const selfData = () =>
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

export const getFiles = () => {
  const { uid } = firebase.auth().currentUser;

  const listRef = firebase.storage().ref(`users/${uid}/`);

  return new Promise((resolve, reject) => {
    listRef
      .listAll()
      .then((res) => {
        resolve(res.items);
      })
      .catch((error) => {
        reject(error);
        // Uh-oh, an error occurred!
      });
  });
};

export const getItem = (itemRef) =>
  new Promise((resolve, reject) => {
    itemRef
      .getMetadata()
      .then((metadata) => {
        resolve(metadata);
        // TODO: Display the image on the UI
      })
      .catch((error) => {
        reject(error);
        // Handle any errors
      });
  });

export const addDownloadUrl = (url) => {
  const { uid } = firebase.auth().currentUser;

  firebase
    .database()
    .ref(`/users/${uid}/files`)
    .transaction((files) => {
      if (files) {
        return [...files, url];
      }
      return [url];
    });
};
