import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

const styleDefault = {
  container: {
    padding: 20,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
};

function colors(color) {
  const backgroundColor = getColorByName(color);
  switch (color) {
    default:
    case 'black':
      return {
        styleContainer: {
          ...styleDefault.container,
          backgroundColor,
        },
        styleText: {
          ...styleDefault.text,
          color: getColorByName('white'),
        },
      };
    case 'transparent':
      return {
        styleContainer: {
          ...styleDefault.container,
          backgroundColor,
        },
        styleText: {
          ...styleDefault.text,
          color: getColorByName('white'),
        },
      };
  }
}

function getStyles(color) {
  return StyleSheet.create(colors(color));
}

export default getStyles;
