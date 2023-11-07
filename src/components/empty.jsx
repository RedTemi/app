import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Typography from './typography';

const style = {
  flex: 1,
  justifyContent: 'center',
  padding: 10,
  // flexDirection: 'column',
  // backgroundColor: 'red',
  // display: 'flex',
  // alignSelf: 'stretch',
  // alignItems: 'center',
  // height: 200,
  // height: '100%',
  // flexGrow: 1,
  // margin: 'auto',
};

function EmptyState({ list, text }) {
  if (list.length !== 0) return null;
  return (
    <View style={style}>
      <Typography centered>
        {text}
      </Typography>
    </View>
  );
}

EmptyState.propTypes = {
  list: PropTypes.arrayOf.isRequired,
  text: PropTypes.string.isRequired,
};

export default memo(EmptyState);
