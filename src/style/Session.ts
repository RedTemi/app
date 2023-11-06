import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

const headerOptions = {
  headerTintColor: ColorPalette.white,
};

const style = StyleSheet.create({
  containerNext: {
    backgroundColor: '#1029B9',
    padding: 20,
    paddingTop: 12,
    width: '100%',
  },
  boxTitle: {
    marginTop: 0,
    marginBottom: 5,
  },
  boxArrow: {
    position: 'absolute',
    right: 15,
    bottom: 15,
  },
  button: {
    marginTop: -70,
    marginBottom: 30,
  },
  safeArea: {
    marginTop: 0,
  },
  sessionTitle: {
    fontFamily: 'graphikMedium',
    fontWeight: 'bold',
    fontSize: 58,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default style;
export { headerOptions };
