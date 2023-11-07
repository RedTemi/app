import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Typography from './typography';

function MeEdit({
  title, description, children, getTextInputRefs,
}) {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView getTextInputRefs={getTextInputRefs}>
        <View style={{ margin: 15, marginTop: 70 }}>
          <View style={{ marginBottom: 20 }}>
            <Typography variant="display4" centered>
              {title}
            </Typography>
            <Typography variant="heading" centered style={{ paddingHorizontal: 30 }}>
              {description}
            </Typography>
            <Typography variant="title" style={{ paddingTop: 80 }}>
              Your coach will help you identify this in a session
            </Typography>
          </View>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

MeEdit.defaultProps = {
  getTextInputRefs: () => [],
};

MeEdit.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  getTextInputRefs: PropTypes.func,
};

export default MeEdit;
