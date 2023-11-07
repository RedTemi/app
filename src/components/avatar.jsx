import React, { useState, useMemo, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import getStyles from '../style/avatar';
import { CameraIcon } from './icons';
import { Row } from './flexbox';

function imgSource(src) {
  if (src.uri === null || src.uri === '') {
    return {
      ...src,
      uri: undefined,
    };
  }
  return {
    ...src,
    uri: `${src.uri}?ts=${Date.now()}`,
  };
}

function Avatar({
  src,
  size,
  style,
  loading,
  onPress,
}) {
  const styles = useMemo(() => getStyles({ size }), [size]);
  const [imgSrc, setImgSrc] = useState();
  useFocusEffect(useCallback(() => {
    setImgSrc(imgSource(src));
  }, [src]));
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={{ ...styles.container, ...style }}
    >
      <Row style={{ flex: 1, width: '100%' }} justifyContent="center">
        {loading === true && <ActivityIndicator color="#ffffff" />}
        {loading === false && (
          imgSrc && imgSrc.uri ? <Image source={imgSrc} style={styles.image} /> : <CameraIcon size="sm" />
        )}
      </Row>
    </TouchableOpacity>
  );
}

Avatar.defaultProps = {
  src: null,
  size: 'default',
  onPress: null,
  loading: false,
  style: {},
};

Avatar.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  loading: PropTypes.bool,
  size: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
};

export default Avatar;
