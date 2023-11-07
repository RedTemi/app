import ColorPalette from '@Constants/colors';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useCallback } from 'react';
import { ActivityIndicator, TouchableOpacity, Image, ViewStyle, ImageURISource } from 'react-native';

import Camera from '@Components/IconComponents/Camera';
import Row from '@Components/Row';
import getStyles from '../style/Avatar';

const getImageSource = (src: ImageURISource) => {
  if (!src.uri) {
    return {
      ...src,
      uri: undefined,
    };
  }
  return {
    ...src,
    uri: `${src.uri}?ts=${Date.now()}`,
  };
};

interface AvatarProps {
  src: ImageURISource;
  size?: 'sm' | 'lg';
  style?: ViewStyle;
  isLoading?: boolean;
  onPress?: () => void;
}

const Avatar = ({ src, size, style, isLoading, onPress }: AvatarProps) => {
  const styles = getStyles({ size });
  const [imgSrc, setImgSrc] = useState<ImageURISource>();

  useFocusEffect(
    useCallback(() => {
      setImgSrc(getImageSource(src));
    }, [src]),
  );

  const renderAvatar = () => {
    if (isLoading) {
      return <ActivityIndicator color={ColorPalette.white} />;
    }

    if (imgSrc?.uri) {
      return <Image source={imgSrc} style={styles.image} />;
    }

    return <Camera size="sm" />;
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress} style={{ ...styles.container, ...style }}>
      <Row style={{ flex: 1, width: '100%' }} justifyContent="center">
        {renderAvatar()}
      </Row>
    </TouchableOpacity>
  );
};

export default Avatar;
