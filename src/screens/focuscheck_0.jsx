import React from 'react';
import { View } from 'react-native';
import Button from '../components/button';
import Typography from '../components/typography';
import style from '../style/focuscheck_edit';

const { containerFull, introTxt } = style;

function FocuscheckScreen0() {
  return (
    <View style={containerFull}>
      <Typography variant="display5" color="primary" centered>
        Focus Check
      </Typography>
      <View style={introTxt}>
        <Typography color="white" centered>
          The Focus Check helps you gain clarity on why a project is important,
          what&apos;s key to investigate and when it&apos;s a success. Use the Focus Check
          when you have important projects that needs that extra momentum.
        </Typography>
      </View>
      <Button goto="Focuscheck1" color="primary">
        Make
      </Button>
    </View>
  );
}

export default FocuscheckScreen0;
