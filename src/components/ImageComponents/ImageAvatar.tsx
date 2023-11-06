import React from 'react';
import { Image, ImageStyle, ImageURISource } from 'react-native';

import Logo from '@Icons/logo';

const styleDefault = {
  height: '100%',
};

interface ImageAvatar {
  source: {
    uri: string;
  };
  style: ImageStyle;
}

const ImageAvatar = ({ source, style }: ImageAvatar) => {
  return <Image defaultSource={Logo as ImageURISource} source={source} style={{ ...styleDefault, ...style }} />;
};
export default ImageAvatar;
