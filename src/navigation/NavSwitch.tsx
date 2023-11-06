import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import NavMain from '@Navigation/NavMain';
import { AppStartScreen } from '@Screens/index';
import Auth from '@Screens/SignIn';
import Start from '@Screens/Start';
import Support from '@Screens/Support';
import navStyleOptions from '@Styles/NavMain';

const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  animationEnabled: false,
};

const optionsWithHeader = (title = '') => {
  const styleOptions = navStyleOptions();
  return {
    ...styleOptions,
    headerShown: true,
    title,
  };
};

const Stack = createStackNavigator();

const NavSwitch = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={AppStartScreen.Start} component={Start} />
      <Stack.Screen name={AppStartScreen.Auth} component={Auth} options={optionsWithHeader()} />
      <Stack.Screen name={AppStartScreen.Support} component={Support} />
      <Stack.Screen name={AppStartScreen.Main} component={NavMain} />
    </Stack.Navigator>
  );
};

export default NavSwitch;
