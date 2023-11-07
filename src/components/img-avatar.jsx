import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import Logo from '../assets/icon/logo.png';

const styleDefault = {
  height: '100%',
};

function ImgAvatar({ source, style }) {
  return <FastImage source={source?.uri ? source : Logo} style={{ ...styleDefault, ...style }} />;
}

ImgAvatar.defaultProps = {
  style: {},
};

ImgAvatar.propTypes = {
  source: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }).isRequired,
  style: PropTypes.shape(),
};

export default ImgAvatar;
