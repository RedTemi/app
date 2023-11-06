import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, ActivityIndicator, ScrollView, View } from 'react-native';

import Button from '@Components/Button';
import Cell from '@Components/Cell';
import Input from '@Components/Input';
import PhoneNumberInput from '@Components/PhoneNumberInput';
import Row from '@Components/Row';
import SafeArea, { SafeAreaSize } from '@Components/SafeArea';
import SupportLink from '@Components/SupportLink';
import Typography, { TypographyVariant } from '@Components/Typography';
import useAuth from '@Hooks/auth';
import { AppStartScreen, Screen } from '@Screens/index';
import style from '@Styles/auth';
import loaderStyle from '@Styles/Loader';

const SignIn = () => {
  const {
    codeLength,
    loading,
    username,
    onChangeUsername,
    userKnown,
    sendCode,
    code,
    onCodeChange,
    signIn,
    errorName,
  } = useAuth();

  const isNotAuthorizedError = errorName === 'NotAuthorizedException';
  const { navigate } = useNavigation();

  const validateSignIn = () => {
    if (!userKnown) {
      return "Number doesn't exist in our database";
    }
    if (isNotAuthorizedError) return 'Wrong code. Try to re-type it or resend a new code';
    return false;
  };

  return (
    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <SafeArea size={SafeAreaSize.lg}>
        {loading && <ActivityIndicator animating={loading} style={loaderStyle.loader} />}
        <KeyboardAvoidingView behavior="padding">
          <Row flexDirection="column" style={{ height: '100%' }}>
            <Cell>
              <View>
                <Typography centered variant={TypographyVariant.display36} style={{ marginTop: 60 }}>
                  Sign in
                </Typography>
                <Typography variant={TypographyVariant.title} centered style={{ marginBottom: 20 }}>
                  Insert your number and you will receive a code to sign in with
                </Typography>
              </View>
            </Cell>

            {validateSignIn() && (
              <Cell>
                <Row style={{ height: 80 }} flexDirection="column" alignItems="center" justifyContent="center">
                  <Typography centered variant={TypographyVariant.title}>
                    {validateSignIn()}
                  </Typography>
                  <SupportLink style={{ paddingTop: 10 }} />
                </Row>
              </Cell>
            )}

            <Cell style={{ width: '100%' }}>
              {!userKnown && (
                <>
                  <PhoneNumberInput value={username} setValue={onChangeUsername} error={errorName} />

                  <View>
                    <Button wide color="black" onPress={sendCode}>
                      Send code
                    </Button>
                  </View>
                  <Button onPress={() => navigate(Screen.Home)}>To home screen</Button>
                  <Button onPress={() => navigate(Screen.Sessions)}>To sessions screen</Button>
                  <Button onPress={() => navigate(AppStartScreen.Support)}>To support screen</Button>
                </>
              )}

              {userKnown && (
                <>
                  <Input
                    onChangeText={onCodeChange}
                    value={code}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    placeholder="Insert Code"
                    maxLength={codeLength}
                    onSubmitEditing={signIn}
                    autoFocus
                    error={errorName}
                    style={{ ...style.input, marginBottom: 30 }}
                  />
                </>
              )}

              <SupportLink />
            </Cell>
          </Row>
        </KeyboardAvoidingView>
      </SafeArea>
    </ScrollView>
  );
};

export default SignIn;
