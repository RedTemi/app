import React from 'react';
import { View } from 'react-native';
import { ImageBackground } from 'react-native';

import Button from '../components/button2';
import ProgressDots, { ProgressDotVariant } from '../components/ProgressDots';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import useTrainerInfo from '../hooks/trainer';
import { Screen } from '../screens/index';

function Trainer() {
  const { avatar } = useTrainerInfo();

  return (
    <ImageBackground source={avatar} style={{ flex: 1, resizeMode: 'cover' }}>
      <SafeArea style={{ flex: 1 }}>
        <ProgressDots variant={ProgressDotVariant.white} targetStep={4} />

        <Typography variant="display2" color="white" style={{ margin: 80 }} centered>
          Let’s get started
        </Typography>
        <Typography variant="display1" color="white" style={{ marginTop: 10 }}>
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
          <Button txt="Book your fist session" goto="OnboardTrainer2" color="black" />
          <Button txt="Skip" goto={Screen.OnboardFinish} color="transparent" />
        </View>
      </SafeArea>
    </ImageBackground>
  );
}

export default Trainer;
