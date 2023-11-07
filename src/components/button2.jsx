import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import getStyles from '../style/button2';

function Button({ txt, goto, onPress, color, textStyle = {} }) {
  const { navigate } = useNavigation();
  const { styleContainer, styleText } = getStyles(color);
  function onPressHandler(event) {
    if (onPress !== null) onPress(event);
    if (goto !== null) navigate(goto);
  }
  return (
    <TouchableOpacity onPress={onPressHandler} style={styleContainer}>
      <Text style={{ ...styleText, ...textStyle }}>{txt}</Text>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  color: 'default',
  goto: null,
  onPress: null,
};

Button.propTypes = {
  txt: PropTypes.string.isRequired,
  color: PropTypes.string,
  goto: PropTypes.string,
  onPress: PropTypes.func,
};

export default memo(Button);
