import { Dimensions, StyleSheet } from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

export default StyleSheet.create({
  modal: {
    marginBottom: 0,
  },
  modalContainer: {
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: width * 0.8,
    height: height * 0.2,
    borderRadius: 35,
  },
  textInput: {
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.34,
    color: 'black',
    textAlign: 'left',
    paddingLeft: 13,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  boldTitle: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
});
