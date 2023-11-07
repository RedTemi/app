import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MESSAGE_LIST from '../graphql/message_list.graphql';
import MessageList from '../components/message_list';
import Messenger from '../components/messenger';
import SafeArea from '../components/safearea';
import KbdView from '../components/kbd_view';
import fComp from '../components/fcomp';
import HeaderTrainer from '../components/header_trainer';
import style from '../style/messages';

const { container } = style;

const queryOptions = {
  pollInterval: 3000,
};

const headerOptions = {
  headerTitle: fComp(HeaderTrainer),
};

function MessagesScreen() {
  const { setOptions } = useNavigation();
  const {
    data: {
      participantGetAsParticipant: {
        userId = '',
        trainer: {
          user: {
            name: trainerName = '',
            avatar: trainerAvatar = '',
          } = {},
        } = {},
      } = {},
      messageList = [],
    } = {},
    loading: loadingMessages,
    refetch,
  } = useQuery(MESSAGE_LIST, queryOptions);
  function customHeader() {
    setOptions(headerOptions);
  }
  useEffect(customHeader, [setOptions]);
  return (
    <KbdView>
      <View style={container}>
        <SafeArea>
          <MessageList
            messages={messageList}
            loading={loadingMessages}
            refetch={refetch}
            userId={userId}
            trainerName={trainerName}
            trainerAvatar={trainerAvatar}
          />
          <Messenger refetch={refetch} />
        </SafeArea>
      </View>
    </KbdView>
  );
}

export default MessagesScreen;
