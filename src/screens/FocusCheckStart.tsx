import ColorPalette from '@Constants/colors';
import React from 'react';
import { View } from 'react-native';

import Button from '@Components/Button';
import Typography, { TypographyVariant } from '@Components/Typography';
import { Screen } from '../screens/index';
import style from '../style/FocusCheckEditStyles';

const FocusCheckStart = () => {
  return (
    <View style={style.containerFull}>
      <Typography variant={TypographyVariant.display80} color={ColorPalette.primary} centered>
        Focus Check
      </Typography>

      <View style={style.introTxt}>
        <Typography variant={TypographyVariant.title} color={ColorPalette.white} centered>
          The Focus Check helps you gain clarity on why a project is important, what&apos;s key to investigate and when
          it&apos;s a success. Use the Focus Check when you have important projects that needs that extra momentum.
        </Typography>
      </View>

      <Button goto={Screen.FocusCheckStep1} color={ColorPalette.primary} wide>
        Make
      </Button>
    </View>
  );
};

export default FocusCheckStart;
