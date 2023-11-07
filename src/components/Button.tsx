import { Color } from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import {
  ButtonProps as NativeButtonProps,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  FlexStyle,
  GestureResponderEvent,
  TextStyle,
} from 'react-native';

import Row from '@Components/Row';
import { AppStartScreen, Screen } from '../screens/index';
import getStyles from '../style/button';
import { IconSize } from '@Utils/types';

export enum ButtonVariant {
  outlined = 'outlined',
  clear = 'clear',
  default = 'default',
}

export interface ButtonProps {
  children: ReactElement | ReactElement[] | string;
  variant?: ButtonVariant;
  color?: Color;
  goto?: Screen | AppStartScreen;
  size?: 'sm';
  wide?: boolean;
  icon?: React.ComponentType<{ size?: IconSize; color?: Color }>;
  disabled?: boolean;
  onPress?: (event: any) => void;
  style?: StyleProp<ViewStyle | FlexStyle | NativeButtonProps | TextStyle>;
}

const Button = ({
  children,
  goto,
  variant = ButtonVariant.default,
  wide,
  color,
  size,
  icon: Icon,
  style,
  disabled,
  onPress,
}: ButtonProps) => {
  const { navigate } = useNavigation();
  const styles = getStyles({
    variant,
    color,
    size,
    wide,
    disabled,
  });
  const onPressHandler = (event: GestureResponderEvent) => {
    if (goto) {
      return navigate(goto);
    }
    if (onPress) {
      return onPress(event);
    }
  };
  return (
    <TouchableOpacity disabled={disabled} onPress={onPressHandler} style={[{ ...styles.button }, style]}>
      <Row justifyContent="center">
        {Icon && <Icon size="sm" />}
        <Text style={styles.text}>{children}</Text>
      </Row>
    </TouchableOpacity>
  );
};

export default Button;
