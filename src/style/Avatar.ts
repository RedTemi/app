import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default function style({ size }: { size?: 'sm' | 'lg' }) {
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
      backgroundColor: ColorPalette.default,
      borderRadius: dimensions,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });
}
