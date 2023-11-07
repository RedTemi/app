import { useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import { ParticipantSettingsDocument } from '../graphql/types.generated';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { View } from 'react-native';

import Avatar from '@Components/Avatar';
import Button from '@Components/Button';
import Cell from '@Components/Cell';
import ProgressDots, { ProgressDotVariant } from '@Components/ProgressDots';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import { Screen } from '../screens/index';

const OnboardPhoto = () => {
  const { navigate } = useNavigation();
  const { data: { participantGetAsParticipant: { user: { avatar: avatarFromDb = '' } = {} } = {} } = {}, refetch } =
    useQuery(ParticipantSettingsDocument);

  const [disableButton, setDisableButton] = useState(false);

  const onPressButton = () => {
    setDisableButton(true);
    navigate(Screen.OnboardTrainerStep1);
  };

  const navigateToCamera = () => navigate(Screen.camera, { navigateTo: Screen.OnboardPhoto });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <SafeArea size={SafeAreaSize.lg}>
      <ProgressDots variant={ProgressDotVariant.black} targetStep={2} />
      <Row flexDirection="column" style={{ flex: 1 }}>
        <Cell>
          <View>
            <Typography variant={TypographyVariant.display36}>Account photo</Typography>
            <Typography variant={TypographyVariant.title} style={{ marginBottom: 20 }}>
              Please upload a photo of yourself. It will make Headlight feel more personal both for you and your coach.
            </Typography>
          </View>
        </Cell>

        <View style={{ marginTop: 'auto' }}>
          <Avatar size="lg" onPress={navigateToCamera} src={{ uri: avatarFromDb }} style={{ marginBottom: 20 }} />
          <Typography centered variant={TypographyVariant.title}>
            Add photo
          </Typography>
        </View>

        <View style={{ marginTop: 'auto', width: '100%' }}>
          <Button wide color="black" onPress={avatarFromDb ? onPressButton : navigateToCamera} disabled={disableButton}>
            {avatarFromDb ? 'Continue' : 'Add my photo'}
          </Button>

          {!avatarFromDb && (
            <Button onPress={onPressButton} color={ColorPalette.transparent} style={{ color: ColorPalette.black }}>
              Skip
            </Button>
          )}
        </View>
      </Row>
    </SafeArea>
  );
};

export default OnboardPhoto;
