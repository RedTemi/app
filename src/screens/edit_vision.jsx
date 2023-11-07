import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useMutation } from '@apollo/client';
import PARTICIPANT_INFO from '../graphql/participant_info.graphql';
import participantUpdateAsParticipant from '../graphql/mutation.participantUpdateAsParticipant.graphql';
import useHeaderSave from '../hooks/header_button';
import MeEdit from '../components/me_edit';
import onError from '../lib/error_handler';

const maxLength = 500;

const style = {
  inputStyle: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: 'black',
  },
};

function EditVision() {
  const { navigate } = useNavigation();
  const {
    data: {
      participantGetAsParticipant: {
        vision = [],
      } = {},
    } = {},
  } = useQuery(PARTICIPANT_INFO);
  const [content, setContent] = useState(vision);
  const [contentEdit] = useMutation(participantUpdateAsParticipant, { onError });
  function onChangeText(index, val) {
    const contentTmp = [...content];
    contentTmp[index] = val;
    setContent(contentTmp);
  }
  async function saveContent() {
    await contentEdit({
      variables: {
        participant: {
          vision: content,
        },
      },
    });
    navigate('Me');
  }
  useHeaderSave(saveContent);
  return (
    <MeEdit title="Vision" description="This is what a meaningful work life gives me">
      <View style={{ width: '100%' }}>
        <TextInput
          placeholder="Type response here"
          onChangeText={(val) => onChangeText(0, val)}
          value={content[0]}
          maxLength={maxLength}
          autoCorrect={false}
          style={style.inputStyle}
        />
        <TextInput
          placeholder="Type response here"
          onChangeText={(val) => onChangeText(1, val)}
          value={content[1]}
          maxLength={maxLength}
          autoCorrect={false}
          style={style.inputStyle}
        />
        <TextInput
          placeholder="Type response here"
          onChangeText={(val) => onChangeText(2, val)}
          value={content[2]}
          maxLength={maxLength}
          autoCorrect={false}
          style={style.inputStyle}
        />
        <TextInput
          placeholder="Type response here"
          onChangeText={(val) => onChangeText(3, val)}
          value={content[3]}
          maxLength={maxLength}
          autoCorrect={false}
          style={style.inputStyle}
        />
      </View>
    </MeEdit>
  );
}

export default EditVision;
