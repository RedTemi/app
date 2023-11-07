import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

export default function style({ past }) {
  const baseText = {
    color: getColorByName('secondary'),
    fontWeight: 'bold',
    ...(past ? {
      color: getColorByName('primary'),
    } : {}),
  };

  return StyleSheet.create({
    container: {
      marginHorizontal: 20,
      backgroundColor: getColorByName('primary'),
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderWidth: 1,
      borderColor: 'transparent',
      ...(past ? {
        backgroundColor: 'white',
        borderColor: getColorByName('primary'),
      } : {}),
    },
    line: {
      backgroundColor: 'black',
      width: 2,
      height: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    date: {
      ...baseText,
    },
    title: {
      ...baseText,
      textAlign: 'right',
    },
    time: {
      ...baseText,
      fontWeight: 'normal',
      textAlign: 'right',
    },
  });
}
