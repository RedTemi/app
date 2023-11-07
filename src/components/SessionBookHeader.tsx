import { dayMonthWeekday } from '../lib/date';
import React, { memo } from 'react';
import { View } from 'react-native';

import Typography, { TypographyVariant } from '@Components/Typography';
import style from '../style/SessionBook';

const SessionBookHeader = ({ start }: { start: string }) => {
  return (
    <View style={style.dayTitle}>
      <Typography variant={TypographyVariant.header} style={{ textTransform: 'uppercase', fontWeight: '600' }} centered>
        {dayMonthWeekday(start)}
      </Typography>
    </View>
  );
};

export default memo(SessionBookHeader);
