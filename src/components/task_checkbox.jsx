import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import getStyles from '../style/task_checkbox';
import { Row } from './flexbox';
import Typography from './typography';
import Checkcircle from './checkcircle';

function TaskCheckbox({ checked, onPress }) {
  const { container, title } = getStyles();
  return (
    <TouchableOpacity onPress={onPress} style={container}>
      <Row style={{ flex: 1 }}>
        <Typography color="white" style={title}>
          Done
        </Typography>
        <Checkcircle checked={checked} />
      </Row>
    </TouchableOpacity>
  );
}

TaskCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default TaskCheckbox;
