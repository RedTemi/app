import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import getStyles from '../style/checkcircle';
import { Checkmark } from './icons';

function Checkcircle({ checked }) {
  return (
    <View style={getStyles({ checked })}>
      {checked && <Checkmark size="sm" />}
    </View>
  );
}

Checkcircle.propTypes = {
  checked: PropTypes.bool.isRequired,
};

export default Checkcircle;
