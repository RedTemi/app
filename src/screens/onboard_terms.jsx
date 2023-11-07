import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import Button from '../components/button';
import { Row, Cell } from '../components/flexbox';
import { Checkmark } from '../components/icons';
import ProgressDots, { ProgressDotVariant } from '../components/ProgressDots';
import SafeArea from '../components/safearea';
import Typography from '../components/typography';
import { useSessionBookTime } from '../context/SessionBookTimeContext';
import { storageSet } from '../lib/storage';
import { Screen } from '../screens/index';

function OnboardTerms() {
  const { navigate } = useNavigation();
  const { setIsOnboarding } = useSessionBookTime();

  async function onPress() {
    await storageSet('onboardStatus', JSON.stringify({ terms: true }));
    setIsOnboarding(true);

    navigate(Screen.onboardPhoto);
  }
  const [checked, setChecked] = useState(false);
  return (
    <SafeArea size="lg">
      <Row column style={{ height: '100%' }}>
        <ProgressDots variant={ProgressDotVariant.black} targetStep={1} />

        <Cell>
          <View>
            <Typography variant="display2">Terms of use</Typography>
            <Typography>
              We value your privacy - Our “Terms of use” covers how we treat your information and how you can use
              Headlight with your subscription.
            </Typography>
            <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => navigate('Terms')}>
              <Row style={{ marginTop: 20 }}>
                <Typography>●</Typography>
                <Cell grow={1} style={{ marginLeft: 10 }}>
                  <View style={{ borderBottomWidth: 1, borderColor: 'black' }}>
                    <Typography variant="title">Terms &amp; conditions</Typography>
                  </View>
                </Cell>
              </Row>
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => navigate('Privacy')}>
              <Row style={{ marginTop: 10 }}>
                <Typography>●</Typography>
                <Cell grow={1} style={{ marginLeft: 10 }}>
                  <View style={{ borderBottomWidth: 1, borderColor: 'black' }}>
                    <Typography variant="title" style={{ borderBottomWidth: 1, borderColor: 'black' }}>
                      Privacy policy
                    </Typography>
                  </View>
                </Cell>
              </Row>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setChecked(_checked => !_checked)}>
              <Row style={{ marginTop: 30 }}>
                <Cell
                  grow={0}
                  style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    width: 25,
                    height: 25,
                    padding: 2,
                  }}
                >
                  {checked && <Checkmark color="black" />}
                </Cell>
                <Cell grow={1} style={{ marginLeft: 10 }}>
                  <Typography>I accept Headlight’s terms of use</Typography>
                </Cell>
              </Row>
            </TouchableOpacity>
          </View>
        </Cell>
        <View style={{ marginTop: 'auto', width: '100%' }}>
          <Button wide onPress={onPress} color="black" disabled={!checked}>
            Continue
          </Button>
        </View>
      </Row>
    </SafeArea>
  );
}

export default OnboardTerms;
