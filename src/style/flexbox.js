import { StyleSheet } from 'react-native';

export function getContainerStyle({ alignItems, justifyContent, column }) {
  return StyleSheet.create({
    style: {
      flexDirection: column ? 'column' : 'row',
      justifyContent,
      alignItems,
    },
  }).style;
}

export function getCellStyle({ grow, shrink }) {
  return StyleSheet.create({
    style: {
      flex: 0,
      flexWrap: 'wrap',
      flexGrow: grow,
      flexShrink: shrink,
    },
  }).style;
}
