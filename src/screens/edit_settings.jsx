import { useQuery, useMutation } from '@apollo/client';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';

import Avatar from '../components/avatar';
import { Row } from '../components/flexbox';
import Input from '../components/input';
import SafeArea from '../components/safearea';
import MutationUpdateParticipant from '../graphql/mutation.participantUpdateAsParticipant.graphql';
import QuerySettings from '../graphql/query.settings.graphql';
import useHeaderSave from '../hooks/header_button';
import userInfo from '../lib/userinfo';
import { Screen } from '../screens/index';

function EditSettings() {
  const { navigate } = useNavigation();
  const {
    data: {
      participantGetAsParticipant: { user: { name: nameFromDb = '', avatar: avatarFromDb = '' } = {} } = {},
    } = {},
    refetch,
  } = useQuery(QuerySettings);
  const [updateParticipant] = useMutation(MutationUpdateParticipant);
  const [name, setName] = useState(nameFromDb);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  function getUserInfo() {
    userInfo().then(attributes => {
      setEmail(attributes.email);
      setPhone(attributes.phone_number);
    });
  }
  useEffect(getUserInfo, []);
  useFocusEffect(
    useCallback(() => {
      refetch();
      getUserInfo();
    }, [refetch]),
  );
  async function save() {
    const promises = [
      updateParticipant({
        variables: {
          participant: {
            name,
            email,
            tel: phone,
          },
        },
      }),
    ];

    await Promise.all(promises);
    navigate('Settings');
  }
  useHeaderSave(save);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <SafeArea>
          <Row justifyContent="center">
            <Avatar
              size="lg"
              onPress={() => navigate(Screen.camera, { navigateTo: Screen.editSettings })}
              src={{ uri: avatarFromDb }}
              style={{ marginBottom: 15 }}
            />
          </Row>
          <Input variant="spacy" placeholder="Full Name" value={name} onChangeText={setName} />
          <Input
            variant="spacy"
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input variant="spacy" placeholder="Phone" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        </SafeArea>
      </ScrollView>
    </View>
  );
}

export default EditSettings;
