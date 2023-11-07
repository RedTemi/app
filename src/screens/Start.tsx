import ColorPalette from '@Constants/colors';
import React from 'react';
import { Image, View } from 'react-native';

import Button from '@Components/Button';
import Cell from '@Components/Cell';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import useAuth from '../hooks/auth';
import Images from '@Images/index';
import { AppStartScreen } from '../screens/index';

const Start = () => {
  useAuth();
  return (
    <View style={{ flex: 1, backgroundColor: ColorPalette.blue }}>
      <SafeArea size={SafeAreaSize.lg}>
        <Row flexDirection="column" style={{ flex: 1 }}>
          <Cell grow={1} style={{ width: '100%', marginBottom: 60, marginTop: 30 }}>
            <View
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image source={Images.LogoVerticalWhiteLarge} resizeMode="contain" style={{ height: '100%' }} />
            </View>
          </Cell>

          <Cell style={{ width: '100%' }}>
            <View style={{ width: '100%' }}>
              <Button wide color="black" goto={AppStartScreen.Auth}>
                Sign in
              </Button>
            </View>
          </Cell>
        </Row>
      </SafeArea>
    </View>
  );
};

export default Start;
