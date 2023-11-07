import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import DisciplinesImage from '../assets/images/disciplines.jpg';
import ImgAmbition from '../assets/images/ambition.png';
import ImgExchange from '../assets/images/exchange.png';
import ImgIntegrity from '../assets/images/integrity.png';
import ImgResponsibility from '../assets/images/responsibility.png';

function whitchImage(discipline) {
  switch (discipline) {
    default:
      return DisciplinesImage;
    case 'ambition':
      return ImgAmbition;
    case 'exchange':
      return ImgExchange;
    case 'integrity':
      return ImgIntegrity;
    case 'responsibility':
      return ImgResponsibility;
  }
}

function DisciplineImage({ discipline }) {
  return (
    <Image
      source={whitchImage(discipline)}
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
}

DisciplineImage.defaultProps = {
  discipline: null,
};

DisciplineImage.propTypes = {
  discipline: PropTypes.string,
};

export default DisciplineImage;
