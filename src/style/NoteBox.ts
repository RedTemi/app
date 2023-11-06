import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default function style({ type }: { type?: 'focus_check' | 'note' }) {
  const { primary, peach, black } = ColorPalette;
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
      borderTopWidth: 1,
      borderTopColor: black,
      borderLeftWidth: 3,
      borderLeftColor: typeColor,
    },
  });
}
