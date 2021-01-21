import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    borderRadius: 15,
    height: 55,
    width: 250,
    marginVertical: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: 'rgba(0,0,0, 0.04)',
    color: 'black',
    fontSize: 18,
  },
  button: {
    borderWidth: 0.5,
    borderRadius: 15,
    height: 55,
    width: 250,
    borderColor: 'black',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'center',
    width: 200,
  },
  text: {
    fontSize: 15,
    color: 'rgba(22,39,61, 0.7)',
  },
});
