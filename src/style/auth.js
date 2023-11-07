import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
    marginBottom: 40,
  },
  paragraph: {
    marginTop: 15,
    marginBottom: 15,
  },
  hidden: {
    opacity: 0,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 0,
    borderBottomWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 2,
  },
  inactive: {
    borderColor: 'lightgray',
  },
  error: {
    color: 'red',
    borderColor: 'red',
  },
});
