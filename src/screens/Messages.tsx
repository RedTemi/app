import { useQuery } from '@apollo/client';
import Colors from '@Constants/colors';
import { DevicePlatform } from '@Constants/global';
import { MessageListDocument, MessageListQuery } from '@Graphql/types.generated';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import Avatar from '@Components/Avatar';
import MessageBox from '@Components/MessageBox';
import Messenger from '@Components/Messenger';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import ScrollViewRefresh from '@Components/ScrollViewRefresh';
import Typography, { TypographyVariant } from '@Components/Typography';
import style from '@Styles/Messages';

const { container, headerAvatar, headerStyle, headerTitle } = style;

const queryOptions = {
  pollInterval: 3000,
};

const MessagesScreen = () => {
  const { setOptions } = useNavigation();

  const {
    data: {
      participantGetAsParticipant: {
        userId = '',
        trainer: { user: { name: trainerName = '', avatar: trainerAvatar = '' } = {} } = {},
      } = {},
      messageList = [],
    } = {},
    loading,
    refetch,
  } = useQuery<MessageListQuery>(MessageListDocument, queryOptions);

  const customHeader = () => {
    setOptions({
      headerTitle: (
        <View style={headerStyle}>
          <Avatar src={{ uri: trainerAvatar }} style={headerAvatar} />
          <Typography variant={TypographyVariant.title} color={Colors.muted} style={headerTitle}>
            {trainerName}
          </Typography>
        </View>
      ),
    });
  };

  useEffect(customHeader, [setOptions]);

  const behavior = Platform.OS === DevicePlatform.ios ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 }}>
      <View style={container}>
        <SafeArea size={SafeAreaSize.md}>
          <View
            style={{
              flex: 1,
              marginTop: 90,
            }}
          >
            <ScrollViewRefresh loading={loading} refetch={refetch} scrollToEnd>
              {messageList.map(({ message, id, fromId }) => (
                <MessageBox key={id} isSender={fromId === userId}>
                  {message}
                </MessageBox>
              ))}
            </ScrollViewRefresh>
          </View>

          <Messenger refetch={refetch} />
        </SafeArea>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessagesScreen;
