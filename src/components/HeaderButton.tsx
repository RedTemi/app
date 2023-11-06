import React from 'react';
import { TouchableOpacity, Text, TextStyle, StyleProp } from 'react-native';

interface HeaderButtonProps {
  onPress: () => void;
  title: string;
  style: StyleProp<TextStyle>;
}

const HeaderButton = ({ onPress, title, style }: HeaderButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[style, { paddingRight: 15 }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default HeaderButton;
