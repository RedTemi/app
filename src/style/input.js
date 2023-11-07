import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

export default function style({ variant, error }) {
  return StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: error ? getColorByName('danger') : getColorByName('gray200'),
    },
    input: {
      fontWeight: 'bold',
      paddingVertical: variant === 'spacy' ? 30 : 20,
      width: '100%',
      ...(variant === 'spacy' ? { textAlign: 'right' } : {}),
      ...(error ? { color: getColorByName('danger') } : {}),
    },
    placeholder: {
      color: getColorByName('muted'),
      fontWeight: 'bold',
      paddingRight: 15,
    },
  });
}
