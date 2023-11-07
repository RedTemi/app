import colors from '../constants/colors';
import styles from './header';

const { headerTintColor, primary, peach } = colors;

const focusStyle = {
  ...styles,
  headerTransparent: false,
  headerStyle: {
    ...styles.headerStyle,
    backgroundColor: peach,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  headerTintColor: primary,
  headerTitleStyle: {
    ...styles.headerTitleStyle,
    color: '#ffffff',
  },
};

function navStyleOptions(style) {
  switch (style) {
    case 'focus_start':
      return {
        ...focusStyle,
        headerStyle: {
          ...focusStyle.headerStyle,
          borderBottomWidth: 0,
        },
      };
    case 'focus':
      return focusStyle;
    case 'settings':
      return {
        ...styles,
        headerTransparent: false,
      };
    default:
      return {
        ...styles,
        headerTintColor,
      };
  }
}

export default navStyleOptions;
