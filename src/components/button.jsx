import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getStyles from '../style/button';
import { Row } from './flexbox';

function Button({
  children,
  goto,
  variant,
  wide,
  color,
  size,
  icon: Icon,
  style,
  disabled,
  onPress,
}) {
  const { navigate } = useNavigation();
  const styles = getStyles({
    variant,
    color,
    size,
    wide,
    disabled,
  });
  function onPressHandler(event) {
    if (goto === null) {
      onPress(event);
    } else {
      navigate(goto);
    }
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPressHandler}
      style={{ ...styles.button, ...style }}
    >
      <Row justifyContent="center">
        {Icon && (
          <Icon size="sm" />
        )}
        <Text style={styles.text}>{children}</Text>
      </Row>
    </TouchableOpacity>
  );
}
Button.defaultProps = {
  variant: 'default',
  color: 'default',
  size: 'default',
  wide: true,
  icon: null,
  style: {},
  goto: null,
  disabled: false,
  onPress: () => {},
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  goto: PropTypes.string,
  icon: PropTypes.func,
  wide: PropTypes.bool,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default Button;
