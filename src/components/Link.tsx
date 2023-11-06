import ColorPalette from '@Constants/colors';
import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

interface LinkProps {
  children: React.ReactNode;
  onPress: () => void;
}

const Link = ({ children, onPress }: LinkProps) => {
  const style = {
    color: ColorPalette.black,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  } as StyleProp<TextStyle>;

  if (!children) {
    return null;
  }
  return (
    <Text onPress={onPress} style={style}>
      {children}
    </Text>
  );
};

export default Link;
