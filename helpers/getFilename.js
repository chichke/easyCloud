import firebase from '../firebase';

const getFilename = (unparsed) => {
  const { uid } = firebase.auth().currentUser;
  const haystack = `users/${uid}`;

  return unparsed.substring(unparsed.indexOf(haystack) + haystack.length + 1);
};

export default getFilename;
