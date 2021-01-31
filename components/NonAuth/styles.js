import { Dimensions, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

export default StyleSheet.create({
  scrollView: { backgroundColor: 'white' },
  KeyboardAvoidingView: { flex: 1 },
  signUpContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: hp(7),
  },
  signInContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: hp(20),
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
  test: {
    width: width * 0.9,
    height: height * 0.3,
    backgroundColor: 'yellow',
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
  forgetButton: { marginVertical: 20 },
  signUpImage: {
    resizeMode: 'contain',
    width: 300,
    height: 100,
    maxWidth: 500,
  },
  signInImage: {
    resizeMode: 'contain',
    width: 300,
    height: 100,
    maxWidth: 500,
    marginBottom: hp(5),
  },
  already: { marginVertical: 20 },
  text: {
    fontSize: 15,
    color: 'rgba(22,39,61, 0.7)',
  },
});
