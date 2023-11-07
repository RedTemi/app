import React from 'react';
import Svg from 'react-native-svg';
import PropTypes from 'prop-types';

function dimensions(size) {
  switch (size) {
    case 'lg':
      return 38;
    case 'md':
      return 26;
    default:
      return 19;
  }
}

function SVG({ children, size }) {
  const dim = dimensions(size);
  return (
    <Svg width={dim} height={dim} viewbox={`0 0 ${dim} ${dim}`}>
      {children}
    </Svg>
  );
}

SVG.defaultProps = {
  size: 'md',
};

SVG.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
};

export default SVG;
