import { Country } from 'react-native-country-picker-modal';

interface CountryMobileCode {
  ISOCode?: Country['cca2'];
  callingCode?: Country['callingCode'][0];
}

const countryMobileCodes: Record<string, CountryMobileCode | undefined> = {
  DK: {
    ISOCode: 'DK',
    callingCode: '45',
  },
  US: {
    ISOCode: 'US',
    callingCode: '1',
  },
  HU: {
    ISOCode: 'HU',
    callingCode: '36',
  },
  FR: {
    ISOCode: 'FR',
    callingCode: '33',
  },
  CN: {
    ISOCode: 'CN',
    callingCode: '86',
  },
  LT: {
    ISOCode: 'LT',
    callingCode: '370',
  },
  GB: {
    ISOCode: 'GB',
    callingCode: '',
  },
};

export default countryMobileCodes;
