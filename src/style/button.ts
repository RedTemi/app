import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

import { ButtonProps, ButtonVariant } from '@Components/Button';

const getButtonStyles = ({
  variant,
  color,
  size,
  wide,
  disabled,
}: Pick<ButtonProps, 'variant' | 'color' | 'size' | 'wide' | 'disabled'>) => {
  let textColor = ColorPalette.white;
  let backgroundColor = ColorPalette.default;
  let borderWidth = 1;
  let borderColor = ColorPalette.black;
  let padding = 20;
  let paddingHorizontal = padding * 0.75;

  // Color
  if (color) {
    borderColor = color;
    backgroundColor = color;

    if (color === ColorPalette.secondary) {
      textColor = ColorPalette.black;
    }
  }

  if (color === ColorPalette.white) {
    textColor = ColorPalette.blue;
  }

  // Variant
  if (variant === ButtonVariant.outlined || variant === ButtonVariant.clear) {
    textColor = backgroundColor;
    backgroundColor = ColorPalette.transparent;

    if (variant === ButtonVariant.clear) {
      borderWidth = 0;
    }
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
};

export default getButtonStyles;
