import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import getStyles from '../style/background';

function Background({
  children,
  color,
  tall,
  style,
}) {
  return (
    <View style={{ ...getStyles({ color, tall }), ...style }}>
      {children}
    </View>
  );
}

Background.defaultProps = {
  tall: 0,
  style: {},
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  tall: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default Background;
