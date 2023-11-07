import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

export default function style({ isSender }) {
  return StyleSheet.create({
    container: {
      borderRadius: 5,
      marginBottom: 15,
      backgroundColor: isSender ? getColorByName('black') : getColorByName('yellow'),
      padding: 20,
      maxWidth: 250,
      marginLeft: isSender ? 'auto' : 0,
      marginRight: isSender ? 0 : 'auto',
    },
    body: {
      color: isSender ? getColorByName('white') : getColorByName('default'),
    },
  });
}
