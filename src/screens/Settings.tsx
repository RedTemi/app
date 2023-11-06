import { useQuery } from '@apollo/client';
import { ParticipantSettingsDocument } from '@Graphql/types.generated';
import { monthYear } from '@Lib/date';
import userInfo from '@Lib/userinfo';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Avatar from '@Components/Avatar';
import Button from '@Components/Button';
import ButtonBox from '@Components/ButtonBox';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import { Screen } from '@Screens/index';

import { version } from '../../package.json';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const {
    data: { participantGetAsParticipant: { createdAt = '', user: { name = '', avatar = '' } = {} } = {} } = {},
    refetch,
  } = useQuery(ParticipantSettingsDocument);

  const getUserInfo = () => {
    userInfo().then(attributes => {
      if (!attributes) {
        return;
      }
      setEmail(attributes.email);
      setPhone(attributes.phone_number);
    });
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
      getUserInfo();
    }, [refetch]),
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <SafeArea size={SafeAreaSize.xl} vSize={SafeAreaSize.lg}>
          <Row justifyContent="center">
            <Avatar size="lg" src={{ uri: avatar }} style={{ marginBottom: 20 }} />
          </Row>
          <Typography variant={TypographyVariant.display36} centered>
            {name}
          </Typography>
          <Typography centered>{email}</Typography>
          <Typography centered>{phone}</Typography>
          <Typography centered style={{ marginVertical: 20 }}>
            Member since&nbsp;
            {monthYear(createdAt)}
          </Typography>
          <Row justifyContent="center">
            <Button size="sm" goto={Screen.EditSettings} wide={false}>
              Edit
            </Button>
          </Row>
        </SafeArea>
        <ButtonBox title="Terms" goto="Terms" />
        <ButtonBox title="Privacy" goto="Privacy" />
        <ButtonBox title="Support" goto="Support" />
        <ButtonBox title="Cancel subscription" goto="CancelSubscription" />
        <SafeArea size={SafeAreaSize.xl} vSize={SafeAreaSize.sm}>
          <Button goto={Screen.SignOut}>Log out</Button>
        </SafeArea>
        <Row justifyContent="center" style={{ marginVertical: 20 }}>
          <Typography variant={TypographyVariant.title}>
            Headlight app version &nbsp;
            {version}
          </Typography>
        </Row>
      </ScrollView>
    </View>
  );
};

export default Settings;
