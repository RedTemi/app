import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, View, TextInput, Platform } from 'react-native';

import useFocuscheckEdit from '../hooks/focuscheck_edit';
import useHeaderButton from '../hooks/header_button';
import style from '../style/focuscheck_edit';

import Typography from './typography';

const { containerQ, header, content, title, pretitle, question, answer, nextButton } = style;

interface FocuscheckScreenQProps {
  nodeId: string | null;
  name: string;
  goto: string;
  title1: string;
  title2: string;
  desc: string;
  placeholder: string;
  btnTxt?: string;
}

const FocuscheckScreenQ = ({
  nodeId = null,
  name,
  goto,
  title1,
  title2,
  desc,
  placeholder,
  btnTxt = 'Next',
}: FocuscheckScreenQProps) => {
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
          {title1 !== '' && (
            <Typography variant="title" color="white" style={pretitle} centered>
              {title1}
            </Typography>
          )}
          <Typography variant="display1" color="white" style={title} centered linefit numberOfLines={2}>
            {title2}
          </Typography>
        </View>
        <View style={content}>
          {desc !== '' && (
            <Typography variant="heading" color="primary" style={question}>
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

export default FocuscheckScreenQ;
