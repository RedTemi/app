import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    zIndex: 9999,
    marginTop: -30,
    marginLeft: -30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
