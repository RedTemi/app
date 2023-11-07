import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import getStyles from '../style/button_box';
import { Row, Cell } from './flexbox';
import Typography from './typography';
import { ArrowRight } from './icons';

function ButtonBox({ title, goto }) {
  const { navigate } = useNavigation();
  const styles = getStyles();
  function onPress() {
    navigate(goto);
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Row alignItems="center">
        <Cell>
          <Typography variant="title" style={{ textTransform: 'uppercase' }}>{title}</Typography>
        </Cell>
        <Cell>
          <ArrowRight size="xl" color="black" />
        </Cell>
      </Row>
    </TouchableOpacity>
  );
}

ButtonBox.propTypes = {
  title: PropTypes.string.isRequired,
  goto: PropTypes.string.isRequired,
};

export default ButtonBox;
