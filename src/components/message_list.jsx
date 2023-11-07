import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import style from '../style/message_list';
import ScrollViewRefresh from './scrollview_refresh';
import MessageBox from './message_box';

const {
  listStyle,
} = style;

function MessageList({
  messages,
  loading,
  refetch,
  userId,
}) {
  return (
    <View style={listStyle}>
      <ScrollViewRefresh loading={loading} refetch={refetch} scrollToEnd>
        { messages.map(({ message, id, fromId }) => (
          <MessageBox key={id} isSender={fromId === userId}>
            {message}
          </MessageBox>
        ))}
      </ScrollViewRefresh>
    </View>
  );
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fromId: PropTypes.string.isRequired,
      toId: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
};

export default MessageList;
