import { StyleSheet } from 'react-native';
import { getColorByName } from '../constants/colors';

export default function style({
  variant,
  color,
  size,
  wide,
  disabled,
}) {
  let textColor = getColorByName('white');
  let backgroundColor = getColorByName('default');
  let borderWidth = 1;
  let borderColor = getColorByName('black');
  let padding = 20;
  let paddingHorizontal = padding * 0.75;

  // Color
  if (color) {
    borderColor = getColorByName(color);
    backgroundColor = getColorByName(color);
    if (color === 'secondary') textColor = getColorByName('black');
  }

  if (color === 'white') {
    textColor = getColorByName('blue');
  }

  // Variant
  if (variant === 'outlined' || variant === 'clear') {
    textColor = backgroundColor;
    backgroundColor = 'transparent';
    if (variant === 'clear') borderWidth = 0;
  }

  // Size
  if (size === 'sm') {
    padding = 10;
    paddingHorizontal = padding * 3;
  }

  return StyleSheet.create({
    button: {
      width: wide ? '100%' : 'auto',
      borderWidth,
      borderColor,
      backgroundColor,
      padding,
      paddingHorizontal,
      opacity: disabled ? 0.25 : 1,
    },
    text: {
      color: textColor,
      fontSize: 14,
      marginLeft: 7,
      textAlign: 'center',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  });
}
