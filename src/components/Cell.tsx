import React from 'react';
import { FlexStyle, View, ViewStyle } from 'react-native';

import { getCellStyle } from '@Utils/style/Flexbox';

interface CellProps {
  children: React.ReactNode;
  grow?: number;
  shrink?: number;
  style?: ViewStyle | FlexStyle;
}

const Cell = ({ children, grow = 0, shrink = 0, style = {} }: CellProps) => (
  <View style={{ ...getCellStyle({ grow, shrink }), ...style }}>{children}</View>
);

export default Cell;
