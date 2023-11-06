import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

interface PressViewProps {
  children: React.ReactNode;
  navigateTo: string;
}

const PressView = ({ children, navigateTo }: PressViewProps) => {
  const { navigate } = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigate(navigateTo)}>
      <View>{children}</View>
    </TouchableWithoutFeedback>
  );
};

export default PressView;
