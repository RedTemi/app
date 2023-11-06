import React from 'react';
import { Image } from 'react-native';

import Images from '@Images/index';

interface DisciplineImageProps {
  discipline?: string;
}

const validateImage = (discipline: string) => {
  switch (discipline) {
    case 'ambition':
      return Images.Ambition;
    case 'exchange':
      return Images.Exchange;
    case 'integrity':
      return Images.Integrity;
    case 'responsibility':
      return Images.Responsibility;
    default:
      return Images.Disciplines;
  }
};

const DisciplineImage = ({ discipline = '' }: DisciplineImageProps) => {
  return (
    <Image
      source={validateImage(discipline)}
      style={{
        width: 250,
        height: 350,
        margin: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        resizeMode: 'contain',
      }}
    />
  );
};

export default DisciplineImage;
