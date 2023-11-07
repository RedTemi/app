import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import Button from '../components/button2';
import ProgressDots, { ProgressDotVariant } from '../components/ProgressDots';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import useTrainerInfo from '../hooks/trainer';
import { Screen } from '../screens/index';
import FastImage from 'react-native-fast-image';

const OnboardTrainer2 = () => {
  const { avatar, name } = useTrainerInfo();
  const { navigate } = useNavigation();

  const source = { uri: avatar };

  const onBookSessionPress = () => {
    navigate(Screen.SessionBook);
  };

  return (
    <FastImage source={source} style={{ flex: 1, resizeMode: 'cover' }}>
      <SafeArea size="lg" style={{ flex: 1 }}>
        <ProgressDots variant={ProgressDotVariant.white} targetStep={4} />

        <View>
          <Typography variant="display2" color="white" centered style={{ marginTop: 80 }}>
            Let’s get started
          </Typography>

          <Typography variant="display1" color="white" style={{ marginTop: 20, marginLeft: 20, fontSize: 18 }}>
            In your first session, you get to know each other, understand the Headlight method and get introduced to the
            next steps.
          </Typography>

          <Typography variant="display1" color="white" style={{ marginTop: 10, marginLeft: 20, fontSize: 18 }}>
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
          <Button txt="Book your fist session" onPress={onBookSessionPress} color="black" />
          <Button txt="Skip" goto={Screen.OnboardFinish} color="transparent" />
        </View>
      </SafeArea>
    </FastImage>
  );
};

export default OnboardTrainer2;
