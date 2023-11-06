import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: ColorPalette.black,
    borderLeftWidth: 3,
  },
  Note: {
    borderLeftColor: ColorPalette.primary,
  },
  Focuscheck: {
    borderLeftColor: ColorPalette.peach,
  },
  cellContent: {
    paddingLeft: 25,
    width: '90%',
  },
  title: {
    maxWidth: '95%',
  },
  arrowCell: {
    width: 30,
  },
});
