import React from 'react';
import { SafeAreaView, StyleProp, ViewStyle } from 'react-native';

import getStyles from '@Styles/SafeArea';

export enum SafeAreaSize {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
  none = 'none',
}
interface SafeAreaProps {
  children: React.ReactNode;
  size?: SafeAreaSize;
  vSize?: SafeAreaSize;
  hSize?: SafeAreaSize;
  style?: StyleProp<ViewStyle>;
}

const SafeArea = ({ children, size = SafeAreaSize.none, vSize, hSize, style }: SafeAreaProps) => {
  return <SafeAreaView style={[getStyles({ size, vSize, hSize }), style]}>{children}</SafeAreaView>;
};

export default SafeArea;
