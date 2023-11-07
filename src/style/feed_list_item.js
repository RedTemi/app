import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

const { primary, peach, black } = colors;

export default StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: black,
    borderLeftWidth: 3,
  },
  Note: {
    borderLeftColor: primary,
  },
  Focuscheck: {
    borderLeftColor: peach,
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
