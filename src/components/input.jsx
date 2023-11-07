import React from 'react';
import { Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import getStyles from '../style/input';
import { Row, Cell } from './flexbox';

function Input({
  variant,
  placeholder,
  keyboardType,
  style,
  value,
  onChangeText,
  autoFocus,
  error,
}) {
  const styles = getStyles({ variant, error });
  if (variant === 'spacy') {
    return (
      <Row style={{ ...styles.container, ...style }}>
        <Cell shrink={0}>
          <Text style={styles.placeholder}>{placeholder}</Text>
        </Cell>
        <Cell grow={1}>
          <TextInput
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            autoFocus={autoFocus}
            autoCorrect={false}
          />
        </Cell>
      </Row>
    );
  }
  return (
    <Row style={{ ...styles.container, ...style }}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        autoFocus={autoFocus}
        autoCorrect={false}
      />
    </Row>
  );
}

Input.defaultProps = {
  variant: '',
  placeholder: '',
  keyboardType: 'default',
  style: {},
  value: '',
  autoFocus: false,
  onChangeText: () => {},
  error: false,
};

Input.propTypes = {
  variant: PropTypes.string,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  autoFocus: PropTypes.bool,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  error: PropTypes.bool,
};

export default Input;
