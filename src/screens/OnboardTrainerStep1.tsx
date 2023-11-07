import ColorPalette from '@Constants/colors';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Button from '@Components/Button';
import ProgressDots, { ProgressDotVariant } from '@Components/ProgressDots';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import { useSessionBookTime } from '../context/SessionBookTimeContext';
import useTrainerInfo from '../hooks/trainer';
import { Screen } from '../screens/index';

const OnboardTrainerStep1 = () => {
  const { name, avatar } = useTrainerInfo();
  const { isOnboarding } = useSessionBookTime();

  const source = { uri: avatar };

  return (
    <FastImage source={source} resizeMode="cover" style={{ flex: 1 }}>
      <SafeArea size={SafeAreaSize.lg} style={{ flex: 1 }}>
        {isOnboarding && <ProgressDots variant={ProgressDotVariant.white} targetStep={3} />}

        <Typography variant={TypographyVariant.display36} color={ColorPalette.white} style={{ margin: 80 }} centered>
          {name}
        </Typography>

        {isOnboarding && (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignSelf: 'stretch',
              padding: 20,
              paddingBottom: 0,
            }}
          >
            <Button goto={Screen.OnboardTrainerStep2} color={ColorPalette.black}>
              Meet your Coach
            </Button>

            <Button goto={Screen.OnboardTrainerStep2} color={ColorPalette.transparent}>
              Skip
            </Button>
          </View>
        )}
      </SafeArea>
    </FastImage>
  );
};

export default OnboardTrainerStep1;
