import React from 'react';
import { StyleSheet, View } from 'react-native';

import Typography from '../components/typography';

const GlobalError = () => {
  return (
    <View style={styles.container}>
      <Typography variant="display1">Unexpected error</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GlobalError;
