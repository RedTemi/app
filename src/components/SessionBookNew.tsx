import ColorPalette from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import Typography, { TypographyVariant } from '@Components/Typography';
import ArrowImages from '@Images/arrows';
import { Screen } from '../screens/index';
import style from '../style/Session';

const { boxTitle, boxArrow } = style;

interface SessionBookNewProps {
  text: string;
}

const SessionBookNew = ({ text }: SessionBookNewProps) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigate(Screen.SessionBook)} style={style.containerNext}>
      <Typography variant={TypographyVariant.display36} color={ColorPalette.white} style={boxTitle}>
        Book sessions
      </Typography>
      <Typography variant={TypographyVariant.display22} color={ColorPalette.white} linefit>
        {text}
      </Typography>
      <Image source={ArrowImages.WhiteArrow} style={boxArrow} />
    </TouchableOpacity>
  );
};

export default SessionBookNew;
