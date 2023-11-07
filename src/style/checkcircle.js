import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

export default function style({ checked }) {
  return StyleSheet.create({
    style: {
      width: 24,
      height: 24,
      backgroundColor: checked ? getColorByName('default') : getColorByName('secondary'),
      borderRadius: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }).style;
}
