import React from 'react';
import { Image } from 'react-native';
import style from '../style/tab_bar_icon';
import HeadlightActive from '../assets/images/menu/headlight-active.png';
import HeadlightInactive from '../assets/images/menu/headlight-inactive.png';
import HomeActive from '../assets/images/menu/home-active.png';
import HomeInactive from '../assets/images/menu/home-inactive.png';
import MeActive from '../assets/images/menu/me-active.png';
import MeInactive from '../assets/images/menu/me-inactive.png';
import SessionsActive from '../assets/images/menu/sessions-active.png';
import SessionsInactive from '../assets/images/menu/sessions-inactive.png';
import ToolsActive from '../assets/images/menu/tools-active.png';
import ToolsInactive from '../assets/images/menu/tools-inactive.png';

function image(name, focused) {
  switch (name) {
    default:
      return null;
    case 'journal':
      return focused ? HeadlightActive : HeadlightInactive;
    case 'home':
      return focused ? HomeActive : HomeInactive;
    case 'me':
      return focused ? MeActive : MeInactive;
    case 'sessions':
      return focused ? SessionsActive : SessionsInactive;
    case 'tools':
      return focused ? ToolsActive : ToolsInactive;
  }
}

function tabBarIcon(name, focused) {
  return <Image source={image(name, focused)} style={style.image} />;
}

export default tabBarIcon;
