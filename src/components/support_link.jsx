import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import Typography from './typography';

function SupportLink({
  color,
  style,
}) {
  const linkMailto = 'mailto:contact@weareheadlight.com';
  const linkWeb = 'https://www.weareheadlight.com/';

  function handlePress() {
    Linking.canOpenURL(linkMailto)
      .then((supported) => {
        if (supported === true) {
          Linking.openURL(linkMailto);
        } else {
          Linking.openURL(linkWeb);
        }
      });
  }

  return (
    <TouchableOpacity onPress={handlePress} style={{ padding: 30, margin: 'auto', ...style }}>
      <Typography
        variant="title"
        color={color}
        style={{
          textAlign: 'center',
        }}
      >
        Contact us
      </Typography>
    </TouchableOpacity>
  );
}

SupportLink.defaultProps = {
  color: 'black',
  style: {},
};

SupportLink.propTypes = {
  color: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
};

export default SupportLink;
