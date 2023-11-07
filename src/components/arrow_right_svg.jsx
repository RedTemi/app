import React from 'react';
import { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { getColorByName } from '../constants/colors';
import SVG from './svg';

function ArrowRight({ size, color }) {
  return (
    <SVG size={size}>
      <Path
        fill={getColorByName(color)}
        d="M10.7929442,12.9482037 L10.7929442,1.5 L8.20705578,1.5 L8.20705578,12.9482037 L4.32822313,8.94813254 L2.5,10.8334994 L8.58588844,17.1096111 C9.09078296,17.6301296 9.90921704,17.6301296 10.4141116,17.1096111 L16.5,10.8334994 L14.6717769,8.94813254 L10.7929442,12.9482037 Z"
        fill-rule="nonzero"
        transform="translate(9.500000, 9.500000) rotate(-90.000000) translate(-9.500000, -9.500000) "
      />
    </SVG>
  );
}

ArrowRight.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

ArrowRight.defaultProps = {
  size: 'md',
  color: 'secondary',
};

export default ArrowRight;
