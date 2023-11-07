import React from 'react';
import { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { getColorByName } from '../constants/colors';
import SVG from './svg';

function Cross({ size, color = 'white' }) {
  return (
    <SVG size={size}>
      <Path
        fill={getColorByName(color)}
        d="M25.893,0.567 C25.137,-0.189 24.003,-0.189 23.247,0.567 L13.23,10.584 L3.213,0.567 C2.457,-0.189 1.323,-0.189 0.567,0.567 C-0.189,1.323 -0.189,2.457 0.567,3.213 L10.584,13.23 L0.567,23.247 C-0.189,24.003 -0.189,25.137 0.567,25.893 C0.945,26.271 1.323,26.46 1.89,26.46 C2.457,26.46 2.835,26.271 3.213,25.893 L13.23,15.876 L23.247,25.893 C23.625,26.271 24.192,26.46 24.57,26.46 C24.948,26.46 25.515,26.271 25.893,25.893 C26.649,25.137 26.649,24.003 25.893,23.247 L15.876,13.23 L25.893,3.213 C26.649,2.457 26.649,1.323 25.893,0.567 Z"
      />
    </SVG>
  );
}

Cross.defaultProps = {
  size: 'md',
  color: 'secondary',
};

Cross.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Cross;
