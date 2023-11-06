import ColorPalette from '@Constants/colors';
import { dayMonth, time } from '@Lib/date';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import SafeArea from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';

const openSeconds = 5;
const openMS = openSeconds * 1000;

interface SessionBookedProps {
  start: string;
  isUpdate: boolean;
}

const SessionBooked = ({ start, isUpdate }: SessionBookedProps) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [start]);

  useEffect(() => {
    if (!start) {
      return () => {};
    }
    const id = setTimeout(setOpen, openMS, false);
    return () => clearTimeout(id);
  }, [start, isUpdate]);

  if (!start || !open) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: ColorPalette.cyan,
        zIndex: 999,
        paddingTop: 300,
        marginTop: -300,
      }}
    >
      <SafeArea>
        <Typography
          variant={TypographyVariant.display22}
          style={{ fontSize: 34, fontWeight: '600' }}
          color="white"
          linefit
          numberOfLines={2}
        >
          {`Session ${isUpdate ? 'rescheduled' : 'booked'} for ${dayMonth(start)} at ${time(start)}`}
        </Typography>
      </SafeArea>
    </View>
  );
};

export default SessionBooked;
