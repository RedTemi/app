import ColorPalette from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Button from '@Components/Button';
import ProgressDots, { ProgressDotVariant } from '@Components/ProgressDots';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import useTrainerInfo from '../hooks/trainer';
import { Screen } from '../screens/index';

const OnboardTrainerStep2 = () => {
  const { avatar, name } = useTrainerInfo();
  const { navigate } = useNavigation();

  const source = { uri: avatar };

  const onBookSessionPress = () => {
    navigate(Screen.SessionBook);
  };

  return (
    <FastImage source={source} resizeMode="cover" style={{ flex: 1 }}>
      <SafeArea size={SafeAreaSize.lg} style={{ flex: 1 }}>
        <ProgressDots variant={ProgressDotVariant.white} targetStep={4} />

        <View>
          <Typography
            variant={TypographyVariant.display36}
            color={ColorPalette.white}
            centered
            style={{ marginTop: 80 }}
          >
            Let’s get started
          </Typography>

          <Typography
            variant={TypographyVariant.display22}
            color={ColorPalette.white}
            style={{ marginTop: 20, marginLeft: 20, fontSize: 18 }}
          >
            In your first session, you get to know each other, understand the Headlight method and get introduced to the
            next steps.
          </Typography>

          <Typography
            variant={TypographyVariant.display22}
            color={ColorPalette.white}
            style={{ marginTop: 10, marginLeft: 20, fontSize: 18 }}
          >
            {`\n${name} looks forward to meet you, so go ahead and book your first session.`}
          </Typography>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignSelf: 'stretch',
            padding: 20,
            paddingBottom: 0,
          }}
        >
          <Button onPress={onBookSessionPress} color="black">
            Book your fist session
          </Button>
          <Button goto={Screen.OnboardFinish} color="transparent">
            Skip
          </Button>
        </View>
      </SafeArea>
    </FastImage>
  );
};

export default OnboardTrainerStep2;
