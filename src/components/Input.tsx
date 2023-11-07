import React from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TextStyle,
} from 'react-native';
import { KeyboardTypeOptions } from 'react-native';

import Cell from '@Components/Cell';
import Row from '@Components/Row';
import getStyles from '../style/Input';

export enum InputVariant {
  spacy = 'spacy',
}

interface InputProps {
  keyboardType?: KeyboardTypeOptions;
  onChangeText: (arg: string) => void;
  variant?: InputVariant;
  placeholder?: string;
  error?: string | null;
  value: string;
  autoFocus?: boolean;
  style?: StyleProp<TextStyle>;
  textContentType?: 'oneTimeCode' | 'telephoneNumber';
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  maxLength?: number;
}

const Input = ({
  variant,
  placeholder,
  keyboardType = 'default',
  style,
  value,
  onChangeText,
  autoFocus,
  error,
  textContentType,
  onSubmitEditing,
  maxLength,
}: InputProps) => {
  const styles = getStyles({ variant, error });
  if (variant === InputVariant.spacy) {
    return (
      <Row style={[{ ...styles.container }, style]}>
        <Cell shrink={0}>
          <Text style={styles.placeholder}>{placeholder}</Text>
        </Cell>
        <Cell grow={1}>
          <TextInput
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
            autoFocus={autoFocus}
            autoCorrect={false}
            textContentType={textContentType}
            onSubmitEditing={onSubmitEditing}
            maxLength={maxLength}
          />
        </Cell>
      </Row>
    );
  }
  return (
    <Row style={[{ ...styles.container }, style]}>
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        autoFocus={autoFocus}
        autoCorrect={false}
      />
    </Row>
  );
};

export default Input;
