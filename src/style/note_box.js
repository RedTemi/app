import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function style({ type }) {
  const { primary, peach, black } = colors;
  let typeColor;
  switch (type) {
    case 'focus_check':
      typeColor = peach;
      break;
    case 'note':
    default:
      typeColor = primary;
      break;
  }

  return StyleSheet.create({
    container: {
      paddingVertical: 20,
      // paddingHorizontal: 25,
      borderTopWidth: 1,
      borderTopColor: black,
      borderLeftWidth: 3,
      borderLeftColor: typeColor,
    },
  });
}
