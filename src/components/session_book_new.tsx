import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import ArrowSEimage from '../assets/arrows/se/white-arrow.png';
import { Screen } from '../screens/index';
import style from '../style/session';

import Typography from './typography';

const { boxTitle, boxArrow } = style;

interface SessionBookNewProps {
  text: string;
}

const SessionBookNew = ({ text }: SessionBookNewProps) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigate(Screen.SessionBook)} style={style.containerNext}>
      <Typography variant="display2" color="white" style={boxTitle}>
        Book session
      </Typography>
      <Typography variant="display1" color="white" linefit>
        {text}
      </Typography>
      <Image source={ArrowSEimage} style={boxArrow} />
    </TouchableOpacity>
  );
};

export default SessionBookNew;
