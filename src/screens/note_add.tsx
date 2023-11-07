import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { NoteAddScreenProp } from 'navigation/main';
import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';

import SafeArea from '../components/safearea';
import NOTE_ADD_AS_PARTICIPANT from '../graphql/note_add_as_participant.graphql';
import NOTE_UPDATE_AS_PARTICIPANT from '../graphql/note_update_as_participant.graphql';
import useHeaderSave from '../hooks/header_button';
import errorHandler from '../lib/error_handler';
import { Screen } from '../screens/index';

export type NoteAddScreenParams = { nodeId: string; serializedPayload: string };

const NoteAdd = () => {
  const { navigate } = useNavigation();
  const route = useRoute<NoteAddScreenProp>();

  const [note, setNote] = useState('');
  const [noteCreate] = useMutation(NOTE_ADD_AS_PARTICIPANT);
  const [noteUpdate] = useMutation(NOTE_UPDATE_AS_PARTICIPANT);

  const saveNote = async () => {
    const noteStr = note.trim();
    if (noteStr === '') return;

    if (route.params?.nodeId) {
      await noteUpdate({
        variables: {
          id: route.params.nodeId,
          note: noteStr,
        },
      }).catch(errorHandler);
    } else {
      await noteCreate({
        variables: {
          note: noteStr,
        },
      }).catch(errorHandler);
    }
    navigate('NavTabs', { screen: Screen.Tools });
  };

  useHeaderSave(saveNote);

  useEffect(() => {
    if (route.params?.serializedPayload) {
      const { note: noteStr } = JSON.parse(route.params.serializedPayload);
      setNote(noteStr);
    }
  }, [route.params?.serializedPayload]);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeArea>
        <TextInput
          multiline
          textAlignVertical="top"
          placeholder="Type your note here"
          onChangeText={setNote}
          value={note}
          maxLength={500}
          autoCorrect={false}
          style={{ flex: 1, marginTop: 60 }}
        />
      </SafeArea>
    </View>
  );
};

export default NoteAdd;
