import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useMutation } from '@apollo/client';
import MESSAGE_ADD_AS_PARTICIPANT from '../graphql/message_add_as_participant.graphql';
import style from '../style/messages';
import errorHandler from '../lib/error_handler';
import { Row } from './flexbox';

const maxLength = 140;

function Messenger({ refetch }) {
  const [message, setMessage] = useState('');
  const [messageCreate] = useMutation(MESSAGE_ADD_AS_PARTICIPANT);
  const [focused, setFocused] = useState(false);

  async function sendMessage() {
    await messageCreate({
      variables: {
        message: message.valueOf(),
      },
    }).catch(errorHandler);
    setMessage('');
    refetch();
  }
  const {
    inputView,
    inputField,
    inputButton,
    inputButtonText,
    inputButtonTextClose,
  } = style;

  function handlePress() {
    if (message === '') {
      Keyboard.dismiss();
      return;
    }
    sendMessage();
  }

  const fieldEmpty = message === '';

  return (
    <Row style={inputView}>
      <TextInput
        multiline
        // numberOfLines={4}
        placeholder="Message your Coach"
        onChangeText={setMessage}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={message}
        maxLength={maxLength}
        onSubmitEditing={sendMessage}
        autoCorrect={false}
        style={inputField}
      />
      {(focused || !fieldEmpty) && (
        <TouchableOpacity onPress={handlePress}>
          <Row justifyContent="center" style={inputButton}>
            <Text style={{ ...inputButtonText, ...(fieldEmpty && inputButtonTextClose) }}>{fieldEmpty ? '╳' : '↑'}</Text>
          </Row>
        </TouchableOpacity>
      )}
    </Row>
  );
}

Messenger.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default Messenger;
