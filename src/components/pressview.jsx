import React from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, View } from 'react-native';

function PressView({ children, goto }) {
  const { navigate } = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigate(goto)}>
      <View>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}

PressView.propTypes = {
  children: PropTypes.node.isRequired,
  goto: PropTypes.string.isRequired,
};

export default PressView;
