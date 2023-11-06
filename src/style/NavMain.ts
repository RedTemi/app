import ColorPalette from '@Constants/colors';

import styles from './Header';

const { headerTintColor, primary, peach } = ColorPalette;

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
    color: '#ffffff',
  },
};

function navStyleOptions(style?: 'focus_start' | 'focus' | 'settings') {
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
