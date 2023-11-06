import ColorPalette from '@Constants/colors';
import { StyleSheet } from 'react-native';

import { InputVariant } from '@Components/Input';

export default function style({ variant, error }: { variant?: InputVariant; error?: string | null }) {
  return StyleSheet.create({
    container: {
      borderBottomWidth: 1,
      borderBottomColor: error ? ColorPalette.danger : ColorPalette.gray200,
    },
    input: {
      fontWeight: 'bold',
      paddingVertical: variant === InputVariant.spacy ? 30 : 20,
      width: '100%',
      ...(variant === InputVariant.spacy ? { textAlign: 'right' } : {}),
      ...(error ? { color: ColorPalette.danger } : {}),
    },
    placeholder: {
      color: ColorPalette.muted,
      fontWeight: 'bold',
      paddingRight: 15,
    },
  });
}
