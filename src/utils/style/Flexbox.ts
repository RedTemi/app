import { FlexAlignType, StyleSheet } from 'react-native';

export interface FlexboxProps {
  alignItems: FlexAlignType;
  justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
}

export function getContainerStyle({ alignItems, justifyContent, flexDirection }: FlexboxProps) {
  return StyleSheet.create({
    style: {
      flexDirection,
      justifyContent,
      alignItems,
    },
  }).style;
}

export function getCellStyle({ grow, shrink }: { grow: number; shrink: number }) {
  return StyleSheet.create({
    style: {
      flex: 0,
      flexWrap: 'wrap',
      flexGrow: grow,
      flexShrink: shrink,
    },
  }).style;
}
