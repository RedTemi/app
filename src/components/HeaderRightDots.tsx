import ColorPalette, { Color } from '@Constants/colors';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Dots from '@Components/ImageComponents/Dots';

interface HeaderRightDotsProps {
  color?: Color;
  onPress: () => void;
}

const HeaderRightDots = ({ color = ColorPalette.blue, onPress }: HeaderRightDotsProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
      <Dots color={color} />
    </TouchableOpacity>
  );
};

export default HeaderRightDots;
