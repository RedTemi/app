import React from 'react';
import PropTypes from 'prop-types';
import { Platform, KeyboardAvoidingView } from 'react-native';

const styleDefault = {
  flex: 1,
};
const behavior = Platform.OS === 'ios' ? 'padding' : null;

function KbdView({ children, style }) {
  return (
    <KeyboardAvoidingView behavior={behavior} style={[styleDefault, style]}>
      {children}
    </KeyboardAvoidingView>
  );
}

KbdView.defaultProps = {
  style: PropTypes.shape(),
};

KbdView.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape(),
};

export default KbdView;
