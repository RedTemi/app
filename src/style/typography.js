import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

export default function style({ variant, centered, color }) {
  const baseHeading = {
    fontWeight: 'bold',
  };

  return StyleSheet.create({
    text: {
      color: getColorByName(color),
      ...(centered ? { textAlign: 'center' } : {}),
      ...(variant === 'display5'
        ? {
            ...baseHeading,
            fontSize: 80,
            marginBottom: 10,
          }
        : {}),
      ...(variant === 'display4'
        ? {
            ...baseHeading,
            fontSize: 58,
            marginBottom: 10,
          }
        : {}),
      ...(variant === 'display3'
        ? {
            ...baseHeading,
            fontSize: 50,
            marginBottom: 30,
          }
        : {}),
      ...(variant === 'display2'
        ? {
            ...baseHeading,
            fontSize: 36,
            marginBottom: 20,
          }
        : {}),
      ...(variant === 'display1'
        ? {
            ...baseHeading,
            fontWeight: 'normal',
            fontSize: 22,
          }
        : {}),
      ...(variant === 'heading'
        ? {
            fontSize: 20,
          }
        : {}),
      ...(variant === 'title'
        ? {
            ...baseHeading,
          }
        : {}),
      ...(variant === 'link'
        ? {
            ...baseHeading,
            textDecorationLine: 'underline',
          }
        : {}),
    },
  });
}
