import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

import NoteImg from '../assets/images/3xnote.png';
import DisciplineTestImg from '../assets/images/disciplineTest.png';
import FocuscheckImg from '../assets/images/focuscheck.png';
import { Screen } from '../screens/index';
import style from '../style/tool';

const boxes = {
  note: {
    styleObj: [style.box, style.box1],
    txt: 'Write a note to help you remember the important stuff',
    goto: Screen.NoteAdd,
    bgImg: NoteImg,
    bgImgStyle: style.bgImg1,
  },
  fc: {
    styleObj: [style.box, style.box2],
    txt: 'Use the Focus Check to gain clarity on important projects',
    goto: 'Focuscheck0',
    bgImg: FocuscheckImg,
    bgImgStyle: style.bgImg2,
  },
  dt: {
    styleObj: [style.box, style.box3],
    txt: 'Discover your personal strengths,\ntheir flip side and where there is\nroom for improvement',
    goto: 'DisciplineTest',
    bgImg: DisciplineTestImg,
    bgImgStyle: style.bgImg3,
  },
};

function Tool({ type }) {
  const { navigate } = useNavigation();
  const { goto, styleObj, txt, bgImg, bgImgStyle } = boxes[type];
  function onPress() {
    navigate(goto);
  }
  return (
    <TouchableOpacity onPress={onPress} style={styleObj}>
      <Image source={bgImg} style={bgImgStyle} />
      <View style={style.txtContainer}>
        <Text style={style.txtWhite}>{txt}</Text>
      </View>
    </TouchableOpacity>
  );
}

Tool.propTypes = {
  type: PropTypes.oneOf(Object.keys(boxes)).isRequired,
};

export default Tool;
