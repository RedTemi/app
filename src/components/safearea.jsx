import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native';
import getStyles from '../style/safearea';

function SafeArea({
  children,
  size,
  vSize,
  hSize,
  style,
}) {
  return (
    <SafeAreaView style={{ ...getStyles({ size, vSize, hSize }), ...style }}>
      {children}
    </SafeAreaView>
  );
}

SafeArea.defaultProps = {
  size: 'md',
  vSize: null,
  hSize: null,
  style: {},
};

SafeArea.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  vSize: PropTypes.string,
  hSize: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default SafeArea;
