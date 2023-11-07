import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { getContainerStyle } from '../style/flexbox';

function Row({
  children,
  alignItems,
  justifyContent,
  column,
  style,
}) {
  return (
    <View style={{ ...getContainerStyle({ alignItems, justifyContent, column }), ...style }}>
      {children}
    </View>
  );
}

Row.defaultProps = {
  column: false,
  alignItems: 'center',
  justifyContent: 'space-between',
  style: {},
};

Row.propTypes = {
  children: PropTypes.node.isRequired,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  column: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default Row;
