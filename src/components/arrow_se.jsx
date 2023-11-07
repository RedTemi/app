import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ArrowSEimage from '../assets/arrows/se/black-arrow.png';
import Typography from './typography';
import { ArrowRight } from './icons';
import { Row } from './flexbox';

function ArrowSE({
  children,
  goto,
  variant,
  color,
  style,
  right,
  navprops,
}) {
  const { navigate } = useNavigation();
  function onPress() {
    navigate(goto, navprops);
  }
  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={onPress} style={style}>
        <Row>
          <Typography color={color} variant={variant} style={{ fontWeight: 'bold', marginRight: 5 }}>
            {children}
          </Typography>
          {right && <ArrowRight size="xl" color="black" />}
        </Row>
        {!right && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Image source={ArrowSEimage} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

ArrowSE.defaultProps = {
  color: 'black',
  variant: null,
  style: {},
  navprops: {},
  right: true,
};

ArrowSE.propTypes = {
  color: PropTypes.string,
  goto: PropTypes.string.isRequired,
  variant: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  navprops: PropTypes.shape(),
  right: PropTypes.bool,
};

export default ArrowSE;
