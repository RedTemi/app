import { useMutation, useQuery } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import {
  ParticipantSettingsDocument,
  ParticipantSettingsQuery,
  ParticipantUpdateAsParticipantDocument,
} from '@Graphql/types.generated';
import userInfo from '@Lib/userinfo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Avatar from '@Components/Avatar';
import Input, { InputVariant } from '@Components/Input';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import useHeaderSave from '@Hooks/headerButton';
import { Screen } from '@Screens/index';

const EditSettings = () => {
  const { navigate } = useNavigation();
  const {
    data: {
      participantGetAsParticipant: { user: { name: nameFromDb = '', avatar: avatarFromDb = '' } = {} } = {},
    } = {},
    refetch,
  } = useQuery<ParticipantSettingsQuery>(ParticipantSettingsDocument);

  const [updateParticipant] = useMutation(ParticipantUpdateAsParticipantDocument);
  const [name, setName] = useState(nameFromDb);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const getUserInfo = () => {
    userInfo().then(attributes => {
      if (!attributes) {
        return;
      }
      setEmail(attributes.email);
      setPhone(attributes.phone_number);
    });
  };

  useEffect(getUserInfo, []);

  useFocusEffect(
    useCallback(() => {
      refetch();
      getUserInfo();
    }, [refetch]),
  );

  const save = async () => {
    await updateParticipant({
      variables: {
        participant: {
          name,
          email,
          tel: phone,
        },
      },
    });

    navigate(Screen.Settings);
  };

  useHeaderSave(save);

  return (
    <View style={{ flex: 1, backgroundColor: ColorPalette.white }}>
      <ScrollView>
        <SafeArea size={SafeAreaSize.md}>
          <Row justifyContent="center">
            <Avatar
              size="lg"
              onPress={() => navigate(Screen.camera, { navigateTo: Screen.EditSettings })}
              src={{ uri: avatarFromDb }}
              style={{ marginBottom: 15 }}
            />
          </Row>
          <Input variant={InputVariant.spacy} placeholder="Full Name" value={name} onChangeText={setName} />
          <Input
            variant={InputVariant.spacy}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            variant={InputVariant.spacy}
            placeholder="Phone"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </SafeArea>
      </ScrollView>
    </View>
  );
};

export default EditSettings;
