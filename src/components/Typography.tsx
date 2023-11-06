import ColorPalette from '@Constants/colors';
import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

export enum TypographyVariant {
  default = 'default',
  header = 'header',
  title = 'title',
  link = 'link',
  display22 = 'display22',
  display36 = 'display36',
  display45 = 'display45',
  display50 = 'display50',
  display58 = 'display58',
  display80 = 'display80',
}

const baseHeading = {
  fontWeight: 'bold',
} as const;

const styles = {
  [TypographyVariant.default]: {},
  [TypographyVariant.display22]: {
    fontWeight: 'normal',
    fontSize: 22,
  },
  [TypographyVariant.display36]: {
    fontSize: 36,
    marginBottom: 20,
    ...baseHeading,
  },
  [TypographyVariant.display45]: {
    fontSize: 45,
    marginBottom: 15,
    ...baseHeading,
  },
  [TypographyVariant.display50]: {
    fontSize: 50,
    marginBottom: 30,
    ...baseHeading,
  },
  [TypographyVariant.display58]: {
    fontSize: 58,
    marginBottom: 10,
    ...baseHeading,
  },
  [TypographyVariant.display80]: {
    fontSize: 80,
    marginBottom: 10,
    ...baseHeading,
  },
  [TypographyVariant.header]: {
    fontSize: 20,
  },
  [TypographyVariant.link]: {
    textDecorationLine: 'underline',
  } as const,
  [TypographyVariant.title]: {
    ...baseHeading,
  },
};

interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  linefit?: boolean;
  centered?: boolean;
  color?: typeof ColorPalette[keyof typeof ColorPalette];
}

const Typography = ({
  children,
  variant = TypographyVariant.default,
  centered,
  color = ColorPalette.default,
  style,
  numberOfLines,
  linefit,
}: TypographyProps) => {
  return (
    <Text
      numberOfLines={linefit && !numberOfLines ? 1 : numberOfLines}
      adjustsFontSizeToFit={linefit}
      style={[styles[variant], centered && { textAlign: 'center' }, { color }, style]}
    >
      {children}
    </Text>
  );
};

export default Typography;
