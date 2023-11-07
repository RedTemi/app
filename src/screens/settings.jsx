import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView } from 'react-native';
import { useQuery } from '@apollo/client';
import QuerySettings from '../graphql/query.settings.graphql';
import SafeArea from '../components/safearea';
import Button from '../components/button';
import ButtonBox from '../components/button_box';
import { Row } from '../components/flexbox';
import Typography from '../components/typography';
import Avatar from '../components/avatar';
import userInfo from '../lib/userinfo';
import { monthYear } from '../lib/date';
import { version } from '../../package.json';
import { Screen } from '../screens/index';

function Settings() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const {
    data: {
      participantGetAsParticipant: {
        createdAt = '',
        user: {
          name = '',
          avatar = '',
        } = {},
      } = {},
    } = {},
    refetch,
  } = useQuery(QuerySettings);
  function getUserInfo() {
    userInfo()
      .then((attributes) => {
        setEmail(attributes.email);
        setPhone(attributes.phone_number);
      });
  }
  useFocusEffect(useCallback(() => {
    refetch();
    getUserInfo();
  }, [refetch]));
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <SafeArea size="xl" vSize="lg">
          <Row justifyContent="center">
            <Avatar size="lg" src={{ uri: avatar }} style={{ marginBottom: 20 }} />
          </Row>
          <Typography variant="display2" centered>
            {name}
          </Typography>
          <Typography centered>
            {email}
          </Typography>
          <Typography centered>
            {phone}
          </Typography>
          <Typography centered style={{ marginVertical: 20 }}>
            Member since&nbsp;
            {monthYear(createdAt)}
          </Typography>
          <Row justifyContent="center">
            <Button size="sm" goto={Screen.editSettings} wide={false}>Edit</Button>
          </Row>
        </SafeArea>
        <ButtonBox title="Terms" goto="Terms" />
        <ButtonBox title="Privacy" goto="Privacy" />
        <ButtonBox title="Support" goto="Support" />
        <ButtonBox title="Cancel subscription" goto="CancelSubscription" />
        <SafeArea size="xl" vSize="md">
          <Button goto="SignOut">Log out</Button>
        </SafeArea>
        <Row justifyContent="center" style={{ marginVertical: 20 }}>
          <Typography>
            Headlight app version
            &nbsp;
            {version}
          </Typography>
        </Row>
      </ScrollView>
    </View>
  );
}

export default Settings;
