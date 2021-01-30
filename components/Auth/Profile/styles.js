import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
  scrollView: { backgroundColor: 'white' },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  picContainer: {
    marginTop: hp(20),
    alignItems: 'center',
  },
  profilePic: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'gray',
    borderWidth: 1.5,
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
    borderWidth: 1.5,
    borderRadius: 10,
  },
  textButton: {
    fontSize: 16,
  },
});
