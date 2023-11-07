import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function style({ color, tall }) {
  return StyleSheet.create({
    style: {
      flex: tall ? 1 : 0,
      backgroundColor: colors[color] || colors.default,
    },
  }).style;
}
