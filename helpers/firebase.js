import firebase from '../firebase';
import { resetFilenames, resetFileSize } from '../redux/actions/file';
import store from '../redux/store';
import transFire from '../translations/firebase';

const addUserMetadata = (formData) => {
  const { uid } = firebase.auth().currentUser;
  const { first, last, phone } = formData;
  const pp = `https://robohash.org/${uid}`;

  firebase.database().ref(`/users/${uid}`).set({ first, last, phone, pp });
};

export const mailChange = (mail) => firebase.auth().currentUser.updateEmail(mail);

export const lnameChange = (lname) => {
  const { uid } = firebase.auth().currentUser;

  return firebase.database().ref(`/users/${uid}/last`).set(lname);
};

export const fnameChange = (fname) => {
  const { uid } = firebase.auth().currentUser;

  return firebase.database().ref(`/users/${uid}/first`).set(fname);
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

    console.log('selfData');
    firebase
      .database()
      .ref(`users/${uid}`)
      .once(
        'value',
        (res) => {
          resolve(res.val());
        },
        (err) => {
          reject(transFire(err.code));
        }
      );
  });

const resetUserPic = () => {
  const { uid } = firebase.auth().currentUser;

  const pp = `https://robohash.org/${uid}`;

  return firebase.database().ref(`/users/${uid}/pp`).set(pp);
};

const getUserPic = () => {
  const { uid } = firebase.auth().currentUser;

  return firebase.database().ref(`/users/${uid}/pp`).once('value');
};

export const deleteLogic = async (itemRef) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    const downloadUrl = await itemRef.getDownloadURL();
    console.log('downloadUrl');
    console.log(downloadUrl);
    const userPic = await (await getUserPic()).val();

    console.log(userPic);
    if (userPic === downloadUrl && downloadUrl && userPic) await resetUserPic();

    itemRef
      .delete()
      .then(() => {
        resolve();
        // File deleted successfully
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getFiles = () => {
  const { uid } = firebase.auth().currentUser;

  // TODO Dispatch setSize at 0
  const listRef = firebase.storage().ref(`users/${uid}/`);
  store.dispatch(resetFileSize());
  store.dispatch(resetFilenames());

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

export const setPP = (url) => {
  const { uid } = firebase.auth().currentUser;

  return firebase.database().ref(`/users/${uid}/pp`).set(url);
};
