import ColorPalette from '@Constants/colors';
import React from 'react';
import { View, Image, TouchableOpacity, ViewStyle } from 'react-native';

import ArrowRight from '@Components/IconComponents/ArrowRightIcon';
import Row from '@Components/Row';
import Typography, { TypographyVariant } from '@Components/Typography';
import ArrowImages from '@Images/arrows';

interface ArrowSecondaryProps {
  children: React.ReactNode;
  onPress: () => void;
  typographyVariant?: TypographyVariant;
  style?: ViewStyle;
  right?: boolean;
}

const ArrowSE = ({ children, onPress, typographyVariant, style, right = false }: ArrowSecondaryProps) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={onPress} style={style}>
        <Row>
          <Typography
            color={ColorPalette.black}
            variant={typographyVariant}
            style={{ fontWeight: 'bold', marginRight: 5 }}
          >
            {children}
          </Typography>

          {right && <ArrowRight size="xl" color={ColorPalette.black} />}
        </Row>

        {!right && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Image source={ArrowImages.BlackArrow} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ArrowSE;
