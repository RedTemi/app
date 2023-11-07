import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { View } from 'react-native';

import Avatar from '../components/avatar';
import Button from '../components/button';
import Button2 from '../components/button2';

import Cell from '../components/cell';
import useImgPicker from '../hooks/img_picker';
import useUpload from '../hooks/img_upload';
import ProgressDots, { ProgressDotVariant } from '../components/ProgressDots';
import Row from '../components/row';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import QuerySettings from '../graphql/query.settings.graphql';
import { Screen } from '../screens/index';

function OnboardPhoto() {
  const { navigate } = useNavigation();
  const { data: { participantGetAsParticipant: { user: { avatar: avatarFromDb } = {} } = {} } = {}, refetch } =
    useQuery(QuerySettings);

  const [disableButton, setDisableButton] = useState(false);

  function onPressButton() {
    setDisableButton(true);
    navigate('OnboardTrainer1');
  }

  const navigateToCamera = () => navigate(Screen.camera, { navigateTo: Screen.onboardPhoto });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  return (
    <SafeArea size="lg">
      <ProgressDots variant={ProgressDotVariant.black} targetStep={2} />
      <Row column style={{ flex: 1 }}>
        <Cell>
          <View>
            <Typography variant="display2">Account photo</Typography>
            <Typography style={{ marginBottom: 20 }}>
              Please upload a photo of yourself. It will make Headlight feel more personal both for you and your coach.
            </Typography>
          </View>
        </Cell>

        <View style={{ marginTop: 'auto' }}>
          <Avatar size="lg" onPress={navigateToCamera} src={{ uri: avatarFromDb }} style={{ marginBottom: 20 }} />
          <Typography centered variant="title">
            Add photo
          </Typography>
        </View>

        <View style={{ marginTop: 'auto', width: '100%' }}>
          <Button wide color="black" onPress={avatarFromDb ? onPressButton : navigateToCamera} disabled={disableButton}>
            {avatarFromDb ? 'Continue' : 'Add my photo'}
          </Button>
          {!avatarFromDb && (
            <Button2 txt="Skip" onPress={onPressButton} color="transparent" textStyle={{ color: 'black' }} />
          )}
        </View>
      </Row>
    </SafeArea>
  );
}

export default OnboardPhoto;
