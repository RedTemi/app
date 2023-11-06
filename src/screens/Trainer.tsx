import ColorPalette from '@Constants/colors';
import React from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';

import Button from '@Components/Button';
import ProgressDots, { ProgressDotVariant } from '@Components/ProgressDots';
import SafeArea from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import useTrainerInfo from '@Hooks/trainer';
import { Screen } from '@Screens/index';

const Trainer = () => {
  const { avatar } = useTrainerInfo();

  return (
    <ImageBackground resizeMode="cover" source={{ uri: avatar }} style={{ flex: 1 }}>
      <SafeArea style={{ flex: 1 }}>
        <ProgressDots variant={ProgressDotVariant.white} targetStep={4} />

        <Typography variant={TypographyVariant.display36} color={ColorPalette.white} style={{ margin: 80 }} centered>
          Let’s get started
        </Typography>

        <Typography variant={TypographyVariant.display22} color={ColorPalette.white} style={{ marginTop: 10 }}>
          Coaching works better when you use it. Let’s book your first session with your coach. In the first session,
          you get to know each other, understand the Headlight method and get started. Headlight sessions are 30
          minutes, making it easy for you to find time for personal and professional growth in your busy schedule.
        </Typography>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignSelf: 'stretch',
            padding: 20,
            paddingBottom: 0,
          }}
        >
          <Button goto={Screen.OnboardTrainerStep1} color={ColorPalette.black}>
            Book your fist session"
          </Button>

          <Button goto={Screen.OnboardFinish} color={ColorPalette.transparent}>
            Skip
          </Button>
        </View>
      </SafeArea>
    </ImageBackground>
  );
};

export default Trainer;
