import ColorPalette from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TextInput, View } from 'react-native';

import Typography, { TypographyVariant } from '@Components/Typography';
import useFocuscheckEdit from '../hooks/focusCheckEdit';
import useHeaderButton from '../hooks/headerButton';
import { Screen } from '../screens/index';
import style from '../style/FocusCheckEditStyles';

const { containerQ, header, content, title, pretitle, question, answer, nextButton } = style;

interface FocusCheckContainerProps {
  nodeId: string | null;
  name: string;
  goto: Screen;
  title1?: string;
  title2: string;
  desc?: string;
  placeholder?: string;
  btnTxt?: string;
}

const FocusCheckContainer = ({
  nodeId = null,
  name,
  goto,
  title1,
  title2,
  desc,
  placeholder,
  btnTxt = 'Next',
}: FocusCheckContainerProps) => {
  const { navigate } = useNavigation();
  const [isNextButtonPressed, setIsNextButtonPressed] = useState(false);

  const { value, onChangeText, loading, onBlur } = useFocuscheckEdit(nodeId, name, isNextButtonPressed);

  const next = () => {
    if (loading) {
      setTimeout(next, 500);
    } else {
      setIsNextButtonPressed(true);

      navigate(goto, {
        nodeId,
      });
    }
  };

  useHeaderButton(next, btnTxt, nextButton);

  return (
    <KeyboardAvoidingView style={{ flexGrow: 1 }} keyboardVerticalOffset={30} behavior={'padding'}>
      <ScrollView contentContainerStyle={{ ...containerQ, flexGrow: 1 }}>
        <View style={header}>
          {title1 && (
            <Typography variant={TypographyVariant.title} color={ColorPalette.white} style={pretitle} centered>
              {title1}
            </Typography>
          )}

          <Typography
            variant={TypographyVariant.display22}
            color={ColorPalette.white}
            style={title}
            centered
            linefit
            numberOfLines={2}
          >
            {title2}
          </Typography>
        </View>

        <View style={content}>
          {desc && (
            <Typography variant={TypographyVariant.header} color={ColorPalette.primary} style={question}>
              {desc}
            </Typography>
          )}
          <TextInput
            multiline
            textAlignVertical="top"
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            maxLength={500}
            style={answer}
            autoCorrect={false}
            onBlur={onBlur}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FocusCheckContainer;
