import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';

function HeaderButton({ onPress, title, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ ...style, paddingRight: 15 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

HeaderButton.defaultProps = {
  style: {},
};

HeaderButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

export default HeaderButton;
