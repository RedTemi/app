import { useMutation } from '@apollo/client';
import { MessageAddAsParticipantDocument } from '@Graphql/types.generated';
import errorHandler from '@Lib/errorHandler';
import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, Keyboard } from 'react-native';

import Row from '@Components/Row';
import style from '@Styles/Messages';

const maxLength = 140;

interface MessengerProps {
  refetch: () => void;
}

const Messenger = ({ refetch }: MessengerProps) => {
  const [message, setMessage] = useState('');
  const [messageCreate] = useMutation(MessageAddAsParticipantDocument);
  const [focused, setFocused] = useState(false);

  const sendMessage = async () => {
    await messageCreate({
      variables: {
        message: message.valueOf(),
      },
    }).catch(errorHandler);

    setMessage('');
    refetch();
  };

  const { inputView, inputField, inputButton, inputButtonText, inputButtonTextClose } = style;

  const handlePress = () => {
    if (message === '') {
      Keyboard.dismiss();
      return;
    }
    sendMessage();
  };

  const fieldEmpty = message === '';

  return (
    <Row style={inputView}>
      <TextInput
        multiline
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
            <Text style={{ ...inputButtonText, ...(fieldEmpty && inputButtonTextClose) }}>
              {fieldEmpty ? '╳' : '↑'}
            </Text>
          </Row>
        </TouchableOpacity>
      )}
    </Row>
  );
};

export default Messenger;
