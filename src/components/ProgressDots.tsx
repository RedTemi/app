import Colors from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Row from '@Components/Row';

import BackIcon from './BackIcon';

export enum ProgressDotVariant {
  black = 'black',
  white = 'white',
}

enum Fill {
  filled = 'filled',
  empty = 'empty',
}

interface ProgressDotsProps {
  targetStep: number;
  variant: ProgressDotVariant;
}

const styles = {
  [ProgressDotVariant.black]: {
    [Fill.filled]: {
      backgroundColor: Colors.black,
    },
    [Fill.empty]: {
      backgroundColor: Colors.transparent,
      borderColor: Colors.black,
      borderWidth: 1,
    },
  },
  [ProgressDotVariant.white]: {
    [Fill.filled]: {
      backgroundColor: Colors.white,
    },
    [Fill.empty]: {
      backgroundColor: Colors.transparent,
      borderColor: Colors.white,
      borderWidth: 1,
    },
  },
};

const ProgressDots = ({ targetStep, variant }: ProgressDotsProps) => {
  const { goBack } = useNavigation();

  const getStyles = (currentStep: number) => {
    const isFilledDot = currentStep <= targetStep ? Fill.filled : Fill.empty;

    return {
      ...styles[variant][isFilledDot],
      height: 15,
      width: 15,
      borderRadius: 50,
    };
  };

  const indicatorsList = [1, 2, 3, 4, 5];
  const stepWithBackgroundPhoto = 3;

  return (
    <Row justifyContent="flex-start" alignItems="center" style={{ width: '100%', marginBottom: 60, marginTop: 10 }}>
      <TouchableOpacity
        onPress={goBack}
        disabled={targetStep === 1}
        style={{ width: 30, height: 30, marginLeft: -18, opacity: targetStep > 1 ? 1 : 0 }}
      >
        <BackIcon color={targetStep >= stepWithBackgroundPhoto ? Colors.white : Colors.black} />
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          width: '95%',
          justifyContent: 'space-between',
          paddingRight: 40,
          paddingBottom: 12,
          marginLeft: 22,
        }}
      >
        {indicatorsList.map(indicator => (
          <View key={indicator} style={{ ...getStyles(indicator) }} />
        ))}
      </View>
    </Row>
  );
};

export default ProgressDots;
