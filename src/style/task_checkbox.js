import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

export default function style() {
  return StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: getColorByName('black'),
      paddingHorizontal: 18,
    },
    title: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  });
}
