import React from 'react';
import { Circle } from 'react-native-progress';

import ColorPalette from '../constants/colors';

const Loader = () => {
  return <Circle size={100} indeterminate={true} color={ColorPalette.gray200} borderWidth={7} />;
};

export default Loader;
