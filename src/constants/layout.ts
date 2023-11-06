import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  navbar: {
    width,
    height: 49,
  },
  isSmallDevice: width < 375,
};
