import ColorPalette from '@Constants/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React from 'react';

import TabBarIconImage from '@Components/ImageComponents/TabBarIconImage';
import { optionsWithHeader } from '@Navigation/NavMain';
import Home from '../screens/Home';
import { Screen } from '../screens/index';
import Journal from '../screens/Journal';
import Me from '../screens/Me';
import Session from '../screens/Session';
import Sessions from '../screens/Sessions';
import Tools from '../screens/Tools';

const { inactiveTintColor, activeTintColor } = ColorPalette;

const tabBarOptions = {
  inactiveTintColor,
  activeTintColor,
  style: {
    height: '10%',
  },
  tabStyle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  labelStyle: {
    paddingTop: 5,
  },
};

const options = (name: string) => {
  return {
    tabBarIcon: ({ focused }: { focused: boolean }) => <TabBarIconImage name={name} focused={focused} />,
  };
};

type SessionStackParamList = {
  [Screen.Sessions]: {
    bookedDate: string | null;
    eventId: string;
  };
  [Screen.Session]: { sessionId: string };
};

export type SessionsTabNavProp = BottomTabScreenProps<SessionStackParamList, Screen.Sessions>;
export type SessionScreenNavProp = RouteProp<SessionStackParamList, Screen.Session>;

const Tab = createBottomTabNavigator();
const SessionsStack = createStackNavigator<SessionStackParamList>();

const SessionsStackNavigator = () => {
  return (
    <SessionsStack.Navigator>
      <SessionsStack.Screen
        name={Screen.Sessions}
        component={Sessions}
        initialParams={{ bookedDate: null }}
        options={{
          ...optionsWithHeader(''),
        }}
      />
      <SessionsStack.Screen
        name={Screen.Session}
        component={Session}
        options={{
          ...optionsWithHeader(''),
          headerLeft: props => <HeaderBackButton {...props} />,
        }}
      />
    </SessionsStack.Navigator>
  );
};

function NavTabs() {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen name={Screen.Home} component={Home} options={options('home')} />
      <Tab.Screen
        name={Screen.SessionsStack}
        component={SessionsStackNavigator}
        options={{ ...options('sessionsStack'), unmountOnBlur: true }}
      />
      <Tab.Screen name={Screen.Tools} component={Tools} options={options('tools')} />
      <Tab.Screen name={Screen.Journal} component={Journal} options={options('journal')} />
      <Tab.Screen name={Screen.Me} component={Me} options={options('me')} />
    </Tab.Navigator>
  );
}

export default NavTabs;
