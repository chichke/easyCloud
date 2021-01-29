import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 25,
    marginHorizontal: 5,
  },
  file: {
    flexDirection: 'row',
    marginVertical: 5,
    paddingVertical: 5,
    height: 60,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  restContainer: {
    flex: 5,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    justifyContent: 'space-between',
    borderBottomColor: 'lightgrey',
  },
  boldText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  title: {
    fontSize: 15,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(22,39,61, 0.7)',
  },
});
