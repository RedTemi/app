import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

export default function style({ checked = false }) {
  const baseText = {
    color: checked ? getColorByName('default') : getColorByName('secondary'),
  };
  return StyleSheet.create({
    container: {
      marginBottom: 15,
      backgroundColor: checked ? 'transparent' : getColorByName('primary'),
      borderWidth: 1,
      borderColor: checked ? getColorByName('default') : getColorByName('primary'),
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
