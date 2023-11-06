import React from 'react';
import { FlexAlignType, FlexStyle, StyleProp, View } from 'react-native';

import { getContainerStyle } from '@Utils/style/Flexbox';

interface RowProps {
  children: React.ReactNode;
  alignItems?: FlexAlignType;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  style?: StyleProp<FlexStyle>;
}

const Row = ({
  children,
  alignItems = 'center',
  justifyContent = 'space-between',
  flexDirection = 'row',
  style,
}: RowProps) => {
  return (
    <View style={[{ ...getContainerStyle({ alignItems, justifyContent, flexDirection }) }, style]}>{children}</View>
  );
};

export default Row;
