import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

import Images from '@Images/index';
import { Screen } from '../screens/index';
import style from '../style/Tool';

const boxes = {
  note: {
    styleObj: [style.box, style.box1],
    txt: 'Write a note to help you remember the important stuff',
    goto: Screen.NoteAdd,
    bgImg: Images.Note3x,
    bgImgStyle: style.bgImg1,
  },
  focusCheck: {
    styleObj: [style.box, style.box2],
    txt: 'Use the Focus Check to gain clarity on important projects',
    goto: Screen.FocusCheckStart,
    bgImg: Images.FocusCheck,
    bgImgStyle: style.bgImg2,
  },
  disciplineTest: {
    styleObj: [style.box, style.box3],
    txt: 'Discover your personal strengths,\ntheir flip side and where there is\nroom for improvement',
    goto: 'DisciplineTest',
    bgImg: Images.DisciplineTest,
    bgImgStyle: style.bgImg3,
  },
};

interface ToolProps {
  type: 'note' | 'focusCheck' | 'disciplineTest';
}

const Tool = ({ type }: ToolProps) => {
  const { navigate } = useNavigation();
  const { goto, styleObj, txt, bgImg, bgImgStyle } = boxes[type];

  return (
    <TouchableOpacity onPress={() => navigate(goto)} style={styleObj}>
      <Image source={bgImg} style={bgImgStyle} />
      <View style={style.txtContainer}>
        <Text style={style.txtWhite}>{txt}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Tool;
