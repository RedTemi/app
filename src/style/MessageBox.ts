import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default function style({ isSender }: { isSender: boolean }) {
  return StyleSheet.create({
    container: {
      borderRadius: 5,
      marginBottom: 15,
      backgroundColor: isSender ? ColorPalette.black : ColorPalette.yellow,
      padding: 20,
      maxWidth: 250,
      marginLeft: isSender ? 'auto' : 0,
      marginRight: isSender ? 0 : 'auto',
    },
    body: {
      color: isSender ? ColorPalette.white : ColorPalette.default,
    },
  });
}
