import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import DotsBlue from '../assets/dots_blue.png';
import DotsWhite from '../assets/dots_white.png';

function Dots({ color }) {
  const source = color === 'white' ? DotsWhite : DotsBlue;
  return (
    <Image source={source} />
  );
}

Dots.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Dots;
