import React from 'react';
import { Path } from 'react-native-svg';

import Colors from '../constants/colors';

import SVG from './svg';

interface BackIconProps {
  size?: 'lg' | 'md';
  color: typeof Colors[keyof typeof Colors];
}

const BackIcon = ({ size, color }: BackIconProps) => {
  return (
    <SVG size={size}>
      <Path
        fill={color}
        d="M8.43695 0.310819C8.12634 0.0758994 7.72961 -0.032802 7.33411 0.00864464C6.93862 0.0500913 6.57677 0.238288 6.32823 0.531805L0.32902 7.6147C-0.109673 8.13222 -0.109673 8.8679 0.32902 9.38542L6.32823 16.4683C6.84593 17.0793 7.79004 17.1783 8.43695 16.6893C9.08387 16.2003 9.18862 15.3086 8.67092 14.6976L3.42161 8.50006L8.67092 2.30253C8.91964 2.00915 9.03473 1.63444 8.99085 1.26089C8.94697 0.887336 8.74771 0.545567 8.43695 0.310819Z"
        fillRule="nonzero"
      />
    </SVG>
  );
};

export default BackIcon;
