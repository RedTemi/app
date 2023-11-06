import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

export default function style({ checked }: { checked: boolean }) {
  return StyleSheet.create({
    style: {
      width: 24,
      height: 24,
      backgroundColor: checked ? ColorPalette.default : ColorPalette.secondary,
      borderRadius: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }).style;
}
