import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { dayMonth, time } from '../lib/date';
import colors from '../constants/colors';
import Typography from './typography';
import SafeArea from './safearea';

const { cyan } = colors;

const openSeconds = 5;
const openMS = openSeconds * 1000;

function SessionBooked({ start, isUpdate }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [start]);
  useEffect(() => {
    if (start === null) return () => {};
    const id = setTimeout(setOpen, openMS, false);
    return () => clearTimeout(id);
  }, [start, isUpdate]);
  if (start === null || open === false) return null;
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: cyan,
        zIndex: 999,
        paddingTop: 300,
        marginTop: -300,
      }}
    >
      <SafeArea>
        <Typography variant="display1" style={{ fontSize: 34, fontWeight: '600' }} color="white" linefit numberOfLines={2}>
          {`Session ${isUpdate ? 'rescheduled' : 'booked'} for ${dayMonth(start)} at ${time(start)}`}
        </Typography>
      </SafeArea>
    </View>
  );
}

SessionBooked.defaultProps = {
  start: null,
  isUpdate: false,
};

SessionBooked.propTypes = {
  start: PropTypes.string,
  isUpdate: PropTypes.bool,
};

export default SessionBooked;
