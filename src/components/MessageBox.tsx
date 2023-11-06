import ColorPalette from '@Constants/colors';
import React from 'react';
import { Text } from 'react-native';

import Background from '@Components/Background';
import getStyle from '@Styles/MessageBox';

interface MessageBoxProps {
  isSender?: boolean;
  children: React.ReactNode;
}

const MessageBox = ({ isSender = true, children }: MessageBoxProps) => {
  const style = getStyle({ isSender });
  return (
    <Background color={ColorPalette.yellow} style={style.container}>
      <Text style={style.body}>{children}</Text>
    </Background>
  );
};

export default MessageBox;
