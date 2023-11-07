import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

export default function style({ size }) {
  let dimensions;
  switch (size) {
    case 'sm':
      dimensions = 25;
      break;
    case 'lg':
      dimensions = 100;
      break;
    default:
      dimensions = 50;
      break;
  }
  return StyleSheet.create({
    container: {
      width: dimensions,
      height: dimensions,
      backgroundColor: getColorByName('default'),
      borderRadius: dimensions,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });
}
