import { StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function style() {
  const { black } = colors;

  return StyleSheet.create({
    container: {
      paddingTop: 35,
      paddingBottom: 30,
      paddingHorizontal: 25,
      borderTopWidth: 1,
      borderTopColor: black,
    },
  });
}
