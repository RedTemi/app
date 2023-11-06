import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default function style() {
  return StyleSheet.create({
    container: {
      paddingTop: 35,
      paddingBottom: 30,
      paddingHorizontal: 25,
      borderTopWidth: 1,
      borderTopColor: ColorPalette.black,
    },
  });
}
