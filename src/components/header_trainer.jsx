import React from 'react';
import { View } from 'react-native';
import { useQuery } from '@apollo/client';
import MESSAGE_LIST from '../graphql/message_list.graphql';
import style from '../style/messages';
import Avatar from './avatar';
import Typography from './typography';

const {
  headerAvatar, headerStyle, headerTitle,
} = style;

function HeaderTrainer() {
  const {
    data: {
      participantGetAsParticipant: {
        trainer: {
          user: {
            name: trainerName = '',
            avatar: trainerAvatar = '',
          } = {},
        } = {},
      } = {},
    } = {},
  } = useQuery(MESSAGE_LIST);
  return (
    <View style={headerStyle}>
      <Avatar size="xl" src={{ uri: trainerAvatar }} style={headerAvatar} />
      <Typography color="muted" style={headerTitle}>
        {trainerName}
      </Typography>
    </View>
  );
}

export default HeaderTrainer;
