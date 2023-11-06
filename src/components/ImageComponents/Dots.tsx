import ColorPalette, { Color } from '@Constants/colors';
import React from 'react';
import { Image } from 'react-native';

import Images from '@Images/index';

interface DotsProps {
  color: Color;
}

const Dots = ({ color }: DotsProps) => {
  const source = color === ColorPalette.white ? Images.DotsWhite : Images.DotsBlue;
  return <Image source={source} />;
};

export default Dots;
