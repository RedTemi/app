import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, ActivityIndicator, ScrollView, View, Text, Image } from 'react-native';
import useAuth from '../hooks/auth';
import style from '../style/auth';
import loaderStyle from '../style/loader';
import SupportLink from '../components/support_link';
import Typography from '../components/typography';
import SafeArea from '../components/safearea';
import Button from '../components/button';
import Input from '../components/input';
import Row from '../components/row';
import Cell from '../components/cell';
import CountryPicker from 'react-native-country-picker-modal';
import PhoneNumberInput from '../components/PhoneNumberInput';

function AuthRouter() {
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

  function getValidation() {
    if (!userKnown && isNotAuthorizedError)
      return 'Sorry, it seems that your phone number is not registered in our system. Please check that you typed the same number as the one used when you registered for Headlight.';
    if (userKnown && isNotAuthorizedError) return 'Wrong code. Try to re-type it or resend a new code';
    return false;
  }

  return (
    <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <SafeArea size="lg">
        {loading && <ActivityIndicator animating={loading} style={loaderStyle.loader} />}
        <KeyboardAvoidingView behavior="padding">
          <Row column style={{ height: '100%' }}>
            <Cell>
              <View>
                <Typography centered variant="display2" style={{ marginTop: 60 }}>
                  Sign in
                </Typography>
                <Typography centered style={{ marginBottom: 20 }}>
                  Insert your number and you will receive a code to sign in with
                </Typography>
              </View>
            </Cell>
            {getValidation() && (
              <Cell>
                <Row style={{ height: 80 }} column alignItems="center" justifyContent="center">
                  <Typography centered variant="title">
                    {getValidation()}
                  </Typography>
                  <SupportLink style={{ paddingTop: 10 }} />
                </Row>
              </Cell>
            )}
            <Cell style={{ width: '100%' }}>
              {(userKnown === null || userKnown === false) && (
                <>
                  <PhoneNumberInput value={username} setValue={onChangeUsername} error={isNotAuthorizedError} />

                  <View>
                    <Button wide color="black" onPress={sendCode}>
                      Send code
                    </Button>
                  </View>
                </>
              )}
              {userKnown === true && (
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

              <SupportLink>Trouble signing in?</SupportLink>
            </Cell>
          </Row>
        </KeyboardAvoidingView>
      </SafeArea>
    </ScrollView>
  );
}

export default AuthRouter;
