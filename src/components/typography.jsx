import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import getStyles from '../style/typography';

function lines(numberOfLines, linefit) {
  if (numberOfLines === undefined && linefit === true) return 1;
  if (numberOfLines !== undefined) return numberOfLines;
  return undefined;
}

function Typography({
  children,
  variant,
  centered,
  color,
  style = {},
  numberOfLines,
  linefit,
}) {
  if (children === null) return null;
  const { text: textStyle } = getStyles({ variant, centered, color });
  const adjustsFontSizeToFit = linefit;
  return (
    <Text
      numberOfLines={lines(numberOfLines, linefit)}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      style={{ ...textStyle, ...style }}
    >
      {children}
    </Text>
  );
}

Typography.defaultProps = {
  style: {},
  centered: false,
  color: 'default',
  variant: 'default',
  numberOfLines: undefined,
  linefit: false,
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  centered: PropTypes.bool,
  color: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  numberOfLines: PropTypes.number,
  linefit: PropTypes.bool,
};

export default memo(Typography);
