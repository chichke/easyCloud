import { StyleSheet } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  scrollView: { backgroundColor: 'white' },
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
  forgetButton: { marginVertical: 20 },
  image: {
    resizeMode: 'center',
    maxWidth: 500,
    width: wp(30),
    height: hp(20),
  },
  already: { marginVertical: 20 },
  text: {
    fontSize: 15,
    color: 'rgba(22,39,61, 0.7)',
  },
});
