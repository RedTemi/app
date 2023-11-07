import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { getContainerStyle } from '../style/flexbox';

function Col({
  children,
  alignItems,
  justifyContent,
  style,
}) {
  return (
    <View style={{ ...getContainerStyle({ alignItems, justifyContent, column: true }), ...style }}>
      {children}
    </View>
  );
}

Col.defaultProps = {
  alignItems: null,
  justifyContent: 'space-between',
  style: {},
};

Col.propTypes = {
  children: PropTypes.node.isRequired,
  alignItems: PropTypes.string,
  justifyContent: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default Col;
