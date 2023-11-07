import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import navStyleOptions from '../style/nav-main';
import Start from '../screens/start';
import Auth from '../screens/auth';
import Support from '../screens/support';
import Main from './main';

const screenOptions = {
  headerShown: false,
  gestureEnabled: false,
  animationEnabled: false,
};

function optionsWithHeader(title = '', style) {
  const styleOptions = navStyleOptions(style);
  return {
    ...styleOptions,
    headerShown: true,
    title,
  };
}

const Stack = createStackNavigator();

function NavSwitch() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Auth" component={Auth} options={optionsWithHeader()} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}

export default NavSwitch;
