import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import LogoImage from '../assets/images/logo_vertical-white.png';
import style from '../style/logo';

function LogoVertical({ style: _style }) {
  return <Image source={LogoImage} style={{ ...style.verticalHome, ..._style }} />;
}

LogoVertical.defaultProps = {
  style: null,
};

LogoVertical.propTypes = {
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default LogoVertical;
