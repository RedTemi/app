import ColorPalette from '@Constants/colors';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Row from '@Components/Row';
import Typography from '@Components/Typography';
import { Screen } from '../screens/index';

const SessionPlaceholderBox = ({ sessionNo, hasVerticalLine }: { sessionNo: number; hasVerticalLine: boolean }) => {
  const { navigate } = useNavigation();

  const onPress = () => {
    navigate(Screen.SessionBook);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Row style={styles.boxContent}>
          <Typography style={styles.sessionNumber} color={ColorPalette.blue} centered>
            {`Book session ${sessionNo}`}
          </Typography>
        </Row>
      </TouchableOpacity>
      {hasVerticalLine && <View style={styles.line} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    borderStyle: 'dashed',
    borderColor: ColorPalette.blue,
    borderWidth: 2,
  },
  line: {
    backgroundColor: ColorPalette.blue,
    width: 2,
    height: 15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  boxContent: {
    alignItems: 'center',
    height: 115,
    justifyContent: 'center',
  },
  sessionNumber: {
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 30,
  },
});

export default SessionPlaceholderBox;
