import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default function style() {
  return StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: ColorPalette.black,
      paddingHorizontal: 18,
    },
    title: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  });
}
