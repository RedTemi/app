import { Color } from '@Constants/colors';
import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface BackgroundProps {
  children: React.ReactNode;
  color: Color;
  tall?: boolean;
  style?: ViewStyle;
}

const getStyles = ({ color, tall }: { color: Color; tall: boolean | undefined }) => {
  return StyleSheet.create({
    style: {
      flex: tall ? 1 : 0,
      backgroundColor: color,
    },
  }).style;
};

const Background = ({ children, color, tall, style }: BackgroundProps) => {
  return <View style={{ ...getStyles({ color, tall }), ...style }}>{children}</View>;
};

export default Background;
