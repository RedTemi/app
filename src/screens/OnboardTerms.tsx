import ColorPalette from '@Constants/colors';
import { StorageKey, storageSet } from '../lib/storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Button from '@Components/Button';
import Cell from '@Components/Cell';
import Checkmark from '@Components/IconComponents/Checkmark';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import Typography, { TypographyVariant } from '@Components/Typography';
import { useSessionBookTime } from '../context/SessionBookTimeContext';
import { Screen } from '../screens/index';

const OnboardTerms = () => {
  const { navigate } = useNavigation();
  const { setIsOnboarding } = useSessionBookTime();

  const onPress = async () => {
    await storageSet(StorageKey.onboardStatus, JSON.stringify({ terms: true }));
    setIsOnboarding(true);

    navigate(Screen.OnboardPhoto);
  };

  const [checked, setChecked] = useState(false);

  return (
    <SafeArea size={SafeAreaSize.lg} style={{ marginTop: 70 }}>
      <Row flexDirection="column" style={{ height: '100%' }}>
        <Cell>
          <View>
            <Typography variant={TypographyVariant.display36}>Terms of use</Typography>
            <Typography variant={TypographyVariant.title}>
              We value your privacy - Our “Terms of use” covers how we treat your information and how you can use
              Headlight with your subscription.
            </Typography>

            <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => navigate(Screen.Terms)}>
              <Row style={{ marginTop: 20 }}>
                <Typography variant={TypographyVariant.title}>●</Typography>
                <Cell grow={1} style={{ marginLeft: 10 }}>
                  <View style={{ borderBottomWidth: 1, borderColor: ColorPalette.black }}>
                    <Typography variant={TypographyVariant.title}>Terms &amp; conditions</Typography>
                  </View>
                </Cell>
              </Row>
            </TouchableOpacity>

            <TouchableOpacity style={{ paddingVertical: 5 }} onPress={() => navigate(Screen.Privacy)}>
              <Row style={{ marginTop: 10 }}>
                <Typography variant={TypographyVariant.title}>●</Typography>
                <Cell grow={1} style={{ marginLeft: 10 }}>
                  <View style={{ borderBottomWidth: 1, borderColor: ColorPalette.black }}>
                    <Typography
                      variant={TypographyVariant.title}
                      style={{ borderBottomWidth: 1, borderColor: ColorPalette.black }}
                    >
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
                    borderColor: ColorPalette.black,
                    width: 25,
                    height: 25,
                    padding: 2,
                  }}
                >
                  {checked && <Checkmark color={ColorPalette.black} />}
                </Cell>

                <Cell grow={1} style={{ marginLeft: 10 }}>
                  <Typography variant={TypographyVariant.title}>I accept Headlight’s terms of use</Typography>
                </Cell>
              </Row>
            </TouchableOpacity>
          </View>
        </Cell>

        <Cell style={{ width: '100%' }}>
          <Button wide onPress={onPress} color={ColorPalette.black} disabled={!checked}>
            Continue
          </Button>
        </Cell>
      </Row>
    </SafeArea>
  );
};

export default OnboardTerms;
