import React from 'react';
import { Image } from 'react-native';

import MenuImages from '@Images/menu';

interface TabBarIconProps {
  name: string;
  focused: boolean;
}

const validateImage = ({ name, focused }: TabBarIconProps) => {
  switch (name) {
    case 'journal':
      return focused ? MenuImages.HeadlightActive : MenuImages.HeadlightInactive;
    case 'home':
      return focused ? MenuImages.HomeActive : MenuImages.HomeInactive;
    case 'me':
      return focused ? MenuImages.MeActive : MenuImages.MeInactive;
    case 'sessionsStack':
      return focused ? MenuImages.SessionsActive : MenuImages.SessionsInactive;
    case 'tools':
      return focused ? MenuImages.ToolsActive : MenuImages.ToolsInactive;
    default:
      return;
  }
};

const TabBarIcon = ({ name, focused }: TabBarIconProps) => {
  const image = validateImage({ name, focused });

  if (!image) {
    return null;
  }

  return (
    <Image
      source={image}
      style={{
        width: 25,
        height: 25,
      }}
    />
  );
};

export default TabBarIcon;
