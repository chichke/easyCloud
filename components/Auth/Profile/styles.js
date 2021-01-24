import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignSelf: "center",
  },
  picContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'lightgrey',
  },
  texts: {
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    marginTop: 20,
  },
  email: {
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-evenly',
  },
  button: {
    height: 50,
    width: 150,
    borderWidth: 0.5,
    borderRadius: 10,
  },
  textButton: {
    fontSize: 16,
  },
});
