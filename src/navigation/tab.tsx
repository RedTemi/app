import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import React from 'react';

import tabBarIcon from '../components/tab_bar_icon';
import colors from '../constants/colors';
import Home from '../screens/home';
import { Screen } from '../screens/index';
import Journal from '../screens/journal';
import Me from '../screens/me';
import Sessions, { SessionsScreenNavParams } from '../screens/sessions';
import Tools from '../screens/tools';

const { inactiveTintColor, activeTintColor } = colors;

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

const options = name => {
  return {
    tabBarIcon: ({ focused }) => tabBarIcon(name, focused),
  };
};

type TabNavigatorParamList = {
  [Screen.sessions]: SessionsScreenNavParams;
};

export type SessionsTabNavProp = BottomTabScreenProps<TabNavigatorParamList, Screen.sessions>;

const Tab = createBottomTabNavigator();

function NavTabs() {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Home" component={Home} options={options('home')} />
      <Tab.Screen
        name="Sessions"
        component={Sessions}
        options={options('sessions')}
        initialParams={{ bookedDate: null }}
      />
      <Tab.Screen name={Screen.Tools} component={Tools} options={options('tools')} />
      <Tab.Screen name="Journal" component={Journal} options={options('journal')} />
      <Tab.Screen name="Me" component={Me} options={options('me')} />
    </Tab.Navigator>
  );
}

export default NavTabs;
