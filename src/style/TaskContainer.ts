import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default function style({ checked = false }) {
  const baseText = {
    color: checked ? ColorPalette.default : ColorPalette.secondary,
  };
  return StyleSheet.create({
    container: {
      marginBottom: 15,
      backgroundColor: checked ? ColorPalette.transparent : ColorPalette.primary,
      borderWidth: 1,
      borderColor: checked ? ColorPalette.default : ColorPalette.primary,
      paddingLeft: 20,
    },
    title: {
      ...baseText,
      fontWeight: 'bold',
      width: '100%',
    },
    body: {
      ...baseText,
    },
  });
}
