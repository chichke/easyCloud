import { Dimensions, StyleSheet } from 'react-native';

const width = Math.round(Dimensions.get('window').width);
const height = Math.round(Dimensions.get('window').height);

export default StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  container: {
    flex: 1,
  },
  bigFlex: {
    flex: 8,
  },
  modalContainer: {
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width,
    height: height * 0.4,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  row: {
    flexDirection: 'row',
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
  icon: {
    alignSelf: 'center',
  },
});
