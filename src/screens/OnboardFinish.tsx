import Colors from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

import Button from '@Components/Button';
import ProgressDots, { ProgressDotVariant } from '@Components/ProgressDots';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import { useSessionBookTime } from '@Context/SessionBookTimeContext';
import useTrainerInfo from '@Hooks/trainer';
import { Screen } from '@Screens/index';

const OnboardFinish = () => {
  const { avatar } = useTrainerInfo();
  const { navigate } = useNavigation();
  const { setIsOnboarding } = useSessionBookTime();

  const source = { uri: avatar };

  const onPress = () => {
    setIsOnboarding(false);
    navigate(Screen.Me);
  };

  return (
    <FastImage source={source} resizeMode="cover" style={{ flex: 1 }}>
      <SafeArea size={SafeAreaSize.lg} style={{ flex: 1, alignItems: 'center' }}>
        <ProgressDots variant={ProgressDotVariant.white} targetStep={5} />

        <View>
          <Typography variant={TypographyVariant.display36} color={Colors.white} style={{ margin: 80, width: '100%' }}>
            You’re all set!
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
          <Button onPress={onPress} color="black">
            Finish
          </Button>
        </View>
      </SafeArea>
    </FastImage>
  );
};

export default OnboardFinish;
