import React from 'react';
import { View, Image } from 'react-native';
import SafeArea from '../components/safearea';
import Button from '../components/button';
// import SupportLink from '../components/support_link';
import Row from '../components/row';
import Cell from '../components/cell';
import colors from '../constants/colors';
import Logo from '../assets/images/logo_vertical-lg.png';
import useAuth from '../hooks/auth';

const { blue } = colors;

function StartRouter() {
  useAuth();
  return (
    <View style={{ flex: 1, backgroundColor: blue }}>
      <SafeArea size="lg">
        <Row column style={{ flex: 1 }}>
          <Cell grow={1} style={{ width: '100%', marginBottom: 60, marginTop: 30 }}>
            <View
              style={{
                flex: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image source={Logo} resizeMode="contain" style={{ height: '100%' }} />
            </View>
          </Cell>
          <Cell style={{ width: '100%' }}>
            <View style={{ width: '100%' }}>
              <Button wide color="black" goto="Auth">
                Sign in
              </Button>
              {/* <SupportLink color="white">
                Not a member?
              </SupportLink> */}
            </View>
          </Cell>
        </Row>
      </SafeArea>
    </View>
  );
}

export default StartRouter;
