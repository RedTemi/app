import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import Button from '../components/button2';
import ProgressDots, { ProgressDotVariant } from '../components/ProgressDots';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import { useSessionBookTime } from '../context/SessionBookTimeContext';
import useTrainerInfo from '../hooks/trainer';
import FastImage from 'react-native-fast-image';

const OnboardFinish = () => {
  const { avatar } = useTrainerInfo();
  const { navigate } = useNavigation();
  const { setIsOnboarding } = useSessionBookTime();

  const source = { uri: avatar };

  const onPress = () => {
    setIsOnboarding(false);
    navigate('Home');
  };

  return (
    <FastImage source={source} resizeMode="cover" style={{ flex: 1 }}>
      <SafeArea size="lg" style={{ flex: 1, alignItems: 'center' }}>
        <ProgressDots variant={ProgressDotVariant.white} targetStep={5} />

        <View>
          <Typography variant="display2" color="white" style={{ marginTop: 80, width: '100%' }}>
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
          <Button txt="Finish" onPress={onPress} color="black" />
        </View>
      </SafeArea>
    </FastImage>
  );
};

export default OnboardFinish;
