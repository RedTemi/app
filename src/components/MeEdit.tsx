import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Typography, { TypographyVariant } from '@Components/Typography';

interface MeEditProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const MeEdit = ({ title, description, children }: MeEditProps) => {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={{ margin: 15, marginTop: 70 }}>
          <View style={{ marginBottom: 20 }}>
            <Typography variant={TypographyVariant.display58} centered>
              {title}
            </Typography>
            <Typography variant={TypographyVariant.header} centered style={{ paddingHorizontal: 30 }}>
              {description}
            </Typography>
            <Typography variant={TypographyVariant.title} style={{ paddingTop: 80 }}>
              Your coach will help you identify this in a session
            </Typography>
          </View>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default MeEdit;
