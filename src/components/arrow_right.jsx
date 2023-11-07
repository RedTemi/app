import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Typography from './typography';
import { ArrowRight } from './icons';
import { Row, Cell } from './flexbox';

function ArrowLink({
  children,
  goto,
  variant,
  color,
  style,
  navprops,
}) {
  const { navigate } = useNavigation();
  function onPress() {
    navigate(goto, navprops);
  }
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Row justifyContent="center">
        <Cell>
          <Typography color={color} variant={variant} style={{ fontWeight: 'bold' }}>{children}</Typography>
        </Cell>
        <Cell style={{ paddingLeft: 5 }}>
          <ArrowRight color={color} />
        </Cell>
      </Row>
    </TouchableOpacity>
  );
}

ArrowLink.defaultProps = {
  color: 'black',
  variant: null,
  style: {},
  navprops: {},
};

ArrowLink.propTypes = {
  color: PropTypes.string,
  goto: PropTypes.string.isRequired,
  variant: PropTypes.string,
  children: PropTypes.string.isRequired,
  style: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navprops: PropTypes.shape(),
};

export default ArrowLink;
