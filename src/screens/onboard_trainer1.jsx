import React from 'react';
import { ImageBackground, View, TouchableOpacity } from 'react-native';
import useTrainerInfo from '../hooks/trainer';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import Button from '../components/button2';
import ProgressDots, { ProgressDotVariant } from '../components/ProgressDots';
import { Screen } from '../screens/index';
import { useNavigation } from '@react-navigation/native';

import Colors from '../constants/colors';
import BackIcon from '../components/BackIcon';
import { useSessionBookTime } from '../context/SessionBookTimeContext';
import FastImage from 'react-native-fast-image';

function OnboardTrainer1() {
  const { name, avatar } = useTrainerInfo();
  const { isOnboarding } = useSessionBookTime();

  const source = { uri: avatar };

  return (
    <FastImage source={source} resizeMode="cover" style={{ flex: 1 }}>
      <SafeArea size="lg" style={{ flex: 1 }}>
        {isOnboarding && <ProgressDots variant={ProgressDotVariant.white} targetStep={3} />}

        <Typography variant="display2" color="white" style={{ margin: 80 }} centered>
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
            <Button txt="Meet your Coach" goto="OnboardTrainer2" color="black" />
            <Button txt="Skip" goto="OnboardTrainer2" color="transparent" />
          </View>
        )}
      </SafeArea>
    </FastImage>
  );
}

export default OnboardTrainer1;
