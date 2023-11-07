import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { getCellStyle } from '../style/flexbox';

function Cell({
  children,
  grow,
  shrink,
  style,
}) {
  return (
    <View style={{ ...getCellStyle({ grow, shrink }), ...style }}>
      {children}
    </View>
  );
}

Cell.defaultProps = {
  children: null,
  grow: 0,
  shrink: 0,
  style: {},
};

Cell.propTypes = {
  children: PropTypes.node,
  grow: PropTypes.number,
  shrink: PropTypes.number,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default Cell;
