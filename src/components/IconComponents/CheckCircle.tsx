import React from 'react';
import { View } from 'react-native';

import Checkmark from '@Components/IconComponents/Checkmark';
import getStyles from '../../style/CheckCircle';

interface CheckCircleProps {
  checked: boolean;
}

const CheckCircle = ({ checked }: CheckCircleProps) => {
  return <View style={getStyles({ checked })}>{checked && <Checkmark size="sm" />}</View>;
};

export default CheckCircle;
