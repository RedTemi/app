import ColorPalette, { Color } from '../../constants/colors';
import React from 'react';
import { Path } from 'react-native-svg';

import Svg from '../../components/Svg';
import { IconSize } from '@Utils/types';

interface CheckmarkProps {
  size?: IconSize;
  color?: Color;
}

const Checkmark = ({ size = 'md', color = ColorPalette.secondary }: CheckmarkProps) => {
  return (
    <Svg size={size}>
      <Path
        fill={color}
        d="M14.280712,5.28071202 L7.98771202,11.573712 L5.69471202,9.28071202 C5.30233313,8.90173981 4.67862724,8.90715965 4.29289345,9.29289345 C3.90715965,9.67862724 3.90173981,10.3023331 4.28071202,10.694712 L7.28071202,13.694712 C7.67121187,14.085094 8.30421217,14.085094 8.69471202,13.694712 L15.694712,6.69471202 C16.0736842,6.30233313 16.0682644,5.67862724 15.6825306,5.29289345 C15.2967968,4.90715965 14.6730909,4.90173981 14.280712,5.28071202 Z"
        fillRule="nonzero"
      />
    </Svg>
  );
};

export default Checkmark;
