import DashedLine from '@Assets/dashed-line.svg';
import ColorPalette from '@Constants/colors';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Typography from '@Components/Typography';

const SessionCycleDivider = ({ cycleNumber }: { cycleNumber: number }) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Typography style={styles.cycle}>cycle {cycleNumber + 1}</Typography>
      <DashedLine style={{ width: '100%' }} />
      <Typography style={styles.prevCycle}>cycle {cycleNumber}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  cycle: {
    paddingTop: 20,
    paddingBottom: 12,
    color: ColorPalette.blue,
  },
  prevCycle: {
    paddingTop: 12,
    paddingBottom: 20,
    color: ColorPalette.blue,
  },
});

export default SessionCycleDivider;
