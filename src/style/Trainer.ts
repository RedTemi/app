import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

const headerOptions = {
  headerTintColor: ColorPalette.white,
};

const style = StyleSheet.create({
  trainerName: {
    position: 'absolute',
    left: 0,
    bottom: '100%',
    width: '100%',
  },
});

export default style;
export { headerOptions };
