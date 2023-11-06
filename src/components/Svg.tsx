import React from 'react';
import SVG from 'react-native-svg';

import { IconSize } from '@Utils/types';

interface SVGProps {
  size?: IconSize;
  children: React.ReactNode;
}

const dimensions = (size: IconSize) => {
  switch (size) {
    case 'lg':
      return 38;
    case 'md':
      return 26;
    default:
      return 19;
  }
};

const Svg = ({ children, size = 'md' }: SVGProps) => {
  const dim = dimensions(size);
  return (
    <SVG width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`}>
      {children}
    </SVG>
  );
};

export default Svg;
