import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Dots } from './icons';

function HeaderRightDots({ color, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
      <Dots color={color} />
    </TouchableOpacity>
  );
}

HeaderRightDots.defaultProps = {
  color: 'blue',
};

HeaderRightDots.propTypes = {
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

export default HeaderRightDots;
