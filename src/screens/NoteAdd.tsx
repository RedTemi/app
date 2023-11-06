import { useMutation } from '@apollo/client';
import NOTE_ADD_AS_PARTICIPANT from '@Graphql/note_add_as_participant.graphql';
import NOTE_UPDATE_AS_PARTICIPANT from '@Graphql/note_update_as_participant.graphql';
import errorHandler from '@Lib/errorHandler';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TextInput, View } from 'react-native';

import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import useHeaderSave from '@Hooks/headerButton';
import { NoteAddScreenProp } from '@Navigation/NavMain';
import { Screen } from '@Screens/index';

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
    navigate(Screen.NavTabs, { screen: Screen.Tools });
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
      <SafeArea size={SafeAreaSize.md}>
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
