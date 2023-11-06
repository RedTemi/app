import ColorPalette from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import Cell from '@Components/Cell';
import ArrowRight from '@Components/IconComponents/ArrowRightIcon';
import Row from '@Components/Row';
import Typography, { TypographyVariant } from '@Components/Typography';
import getStyles from '@Styles/ButtonBox';

interface ButtonBoxProps {
  title: string;
  goto: string;
}

const ButtonBox = ({ title, goto }: ButtonBoxProps) => {
  const { navigate } = useNavigation();
  const styles = getStyles();
  function onPress() {
    navigate(goto);
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Row alignItems="center">
        <Cell>
          <Typography variant={TypographyVariant.title} style={{ textTransform: 'uppercase' }}>
            {title}
          </Typography>
        </Cell>
        <Cell>
          <ArrowRight size="xl" color={ColorPalette.black} />
        </Cell>
      </Row>
    </TouchableOpacity>
  );
};

export default ButtonBox;
