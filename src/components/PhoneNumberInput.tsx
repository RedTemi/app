import * as Cellular from 'expo-cellular';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CountryPicker, { Country } from 'react-native-country-picker-modal';
import TextInputMask from 'react-native-text-input-mask';

import ColorPalette from '@Constants/colors';
import countryMobileCodes from '@Constants/countryMobileCodes';

enum Mask {
  US = '{+} [0] ([000])-[000]-[00]-[00]',
  DK = '{+}[00] [00] [00] [00] [00]',
  otherCountry = '{+}[0000000000000]',
}

enum Placeholder {
  US = '+1 (000)-000-00-00',
  DK = '+45 00 00 00 00',
  otherCountry = 'Phone Number',
}

enum CountryCode {
  US = 'US',
  DK = 'DK',
}

enum CallingCode {
  DK = '45',
}

const callingCodePrefix = '+';

const getCountryDetails = (countryCode: Country['cca2']) => {
  if (countryCode === CountryCode.US) {
    return {
      mask: Mask.US,
      placeholder: Placeholder.US,
    };
  }
  if (countryCode === CountryCode.DK) {
    return {
      mask: Mask.DK,
      placeholder: Placeholder.DK,
    };
  }

  return {
    mask: Mask.otherCountry,
    placeholder: Placeholder.otherCountry,
  };
};
interface PhoneNumberInputProps {
  value: string;
  setValue: (value: string) => void;
  error?: string | null;
}

const PhoneNumberInput = ({ value, setValue, error }: PhoneNumberInputProps) => {
  const simCardCountryCode = (
    Cellular.isoCountryCode ? Cellular.isoCountryCode.toUpperCase() : CountryCode.DK
  ) as Country['cca2'];

  const ISOcode = countryMobileCodes[simCardCountryCode]?.ISOCode || CountryCode.DK;

  const callingCodeDefault = countryMobileCodes[simCardCountryCode]?.callingCode || CallingCode.DK;

  const [countryCode, setCountryCode] = useState<Country['cca2']>(ISOcode);

  const [callingCode, setCallingCode] = useState<Country['callingCode'][0]>(callingCodeDefault);

  const countryDetails = getCountryDetails(countryCode);

  useEffect(() => {
    setValue(`${callingCodePrefix}${callingCode}`);
  }, [callingCode]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: error ? ColorPalette.danger : ColorPalette.gray200,
        width: '100%',
        marginBottom: 30,
      }}
    >
      <CountryPicker
        withFlag
        withCallingCode
        withFilter
        countryCode={countryCode}
        visible={false}
        withEmoji={false}
        onSelect={(country: Country) => {
          setCountryCode(country.cca2);
          setCallingCode(country.callingCode[0]);
        }}
        theme={{
          fontSize: 12,
          fontFamily: 'graphikMedium',
          flagSizeButton: 16,
        }}
        containerButtonStyle={{ marginBottom: 14 }}
        preferredCountries={[CountryCode.US, CountryCode.DK]}
      />
      <TextInputMask
        autoFocus
        value={value}
        mask={countryDetails.mask}
        editable
        placeholder={countryDetails.placeholder}
        keyboardType="phone-pad"
        onChangeText={formatted => {
          setValue(formatted);
        }}
        style={{
          flex: 1,
          height: 50,
          paddingLeft: 0,
          marginBottom: 10,
          color: error ? ColorPalette.danger : ColorPalette.black,
        }}
      />
    </View>
  );
};

export default PhoneNumberInput;
