import React from 'react';
import { StyleSheet, View } from 'react-native';

import Typography, { TypographyVariant } from '@Components/Typography';

const style = StyleSheet.create({
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
});

interface EmptyStateProps {
  list: Record<string, unknown>[];
  text: string;
  typographyVariant?: TypographyVariant;
}

const EmptyState = ({ list, text, typographyVariant }: EmptyStateProps) => {
  if (list.length) {
    return null;
  }

  return (
    <View style={style.emptyState}>
      <Typography centered variant={typographyVariant}>
        {text}
      </Typography>
    </View>
  );
};

export default EmptyState;
