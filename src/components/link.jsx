import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';

function Link({
  children,
  onPress,
}) {
  const style = { color: 'black', fontWeight: 'bold', textDecorationLine: 'underline' };
  if (children === null) return null;
  return (
    <Text onPress={onPress} style={style}>
      {children}
    </Text>
  );
}

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Link;
