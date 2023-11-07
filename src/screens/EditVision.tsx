import { useQuery, useMutation } from '@apollo/client';
import ColorPalette from '@Constants/colors';
import { ParticipantDetailsDocument, ParticipantUpdateAsParticipantDocument } from '../graphql/types.generated';
import onError from '../lib/errorHandler';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import MeEdit from '@Components/MeEdit';
import useHeaderSave from '../hooks/headerButton';
import { Screen } from '../screens/index';

const maxLength = 500;

const style = {
  inputStyle: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: ColorPalette.black,
  },
};

const EditVision = () => {
  const { navigate } = useNavigation();
  const { data: { participantGetAsParticipant: { vision = [] } = {} } = {} } = useQuery(ParticipantDetailsDocument);
  const [content, setContent] = useState(vision);
  const [contentEdit] = useMutation(ParticipantUpdateAsParticipantDocument, { onError });

  const onChangeText = (index: number, val: string) => {
    const contentTmp = [...content];
    contentTmp[index] = val;
    setContent(contentTmp);
  };

  const saveContent = async () => {
    await contentEdit({
      variables: {
        participant: {
          vision: content,
        },
      },
    });

    navigate(Screen.Me);
  };

  useHeaderSave(saveContent);

  return (
    <MeEdit title="Vision" description="This is what a meaningful work life gives me">
      <View style={{ width: '100%' }}>
        <TextInput
          placeholder="Type response here"
          onChangeText={val => onChangeText(0, val)}
          value={content[0]}
          maxLength={maxLength}
          autoCorrect={false}
          style={style.inputStyle}
        />
        <TextInput
          placeholder="Type response here"
          onChangeText={val => onChangeText(1, val)}
          value={content[1]}
          maxLength={maxLength}
          autoCorrect={false}
          style={style.inputStyle}
        />
        <TextInput
          placeholder="Type response here"
          onChangeText={val => onChangeText(2, val)}
          value={content[2]}
          maxLength={maxLength}
          autoCorrect={false}
          style={style.inputStyle}
        />
        <TextInput
          placeholder="Type response here"
          onChangeText={val => onChangeText(3, val)}
          value={content[3]}
          maxLength={maxLength}
          autoCorrect={false}
          style={style.inputStyle}
        />
      </View>
    </MeEdit>
  );
};

export default EditVision;
