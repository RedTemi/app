import ColorPalette, { Color } from '@Constants/colors';
import React from 'react';
import { Path } from 'react-native-svg';

import Svg from '@Components/Svg';
import { IconSize } from '@Utils/types';

interface SettingsProps {
  size?: IconSize;
  color?: Color;
}

const Settings = ({ size = 'md', color = ColorPalette.secondary }: SettingsProps) => {
  return (
    <Svg size={size}>
      <Path
        fill={color}
        d="M18.0932011,7.80771705 C18.3664218,7.85327475 18.5666667,8.08967377 18.5666667,8.36666667 L18.5666667,10.6333333 C18.5666667,10.9103262 18.3664218,11.1467252 18.0932011,11.1922829 L15.9791838,11.544781 C15.8602549,11.9223711 15.7092346,12.287009 15.5276452,12.6357035 L16.7726397,14.3808322 C16.9334451,14.6062358 16.9078142,14.9148401 16.7120272,15.1106272 L15.1094938,16.7131605 C14.913611,16.9090433 14.6048195,16.9345915 14.3794074,16.773565 L12.6354782,15.5277625 C12.286852,15.7092997 11.9222898,15.8602805 11.544781,15.9791838 L11.1922829,18.0932011 C11.1467252,18.3664218 10.9103262,18.5666667 10.6333333,18.5666667 L8.36666667,18.5666667 C8.08967377,18.5666667 7.85327475,18.3664218 7.80771705,18.0932011 L7.45521899,15.9791838 C7.07766274,15.8602656 6.71305639,15.7092617 6.36439033,15.5276941 L4.62042254,16.7725531 C4.39501541,16.9334506 4.0863331,16.9078541 3.89050616,16.7120272 L2.28797282,15.1094938 C2.09214588,14.9136669 2.06654943,14.6049846 2.22744695,14.3795775 L3.47230592,12.6356097 C3.29073828,12.2869436 3.13973442,11.9223373 3.02081623,11.544781 L0.906798939,11.1922829 C0.633578225,11.1467252 0.433333333,10.9103262 0.433333333,10.6333333 L0.433333333,8.36666667 C0.433333333,8.08967377 0.633578225,7.85327475 0.906798939,7.80771705 L3.02081623,7.45521899 C3.13973442,7.07766274 3.29073828,6.71305639 3.47230592,6.36439033 L2.22744695,4.62042254 C2.06654943,4.39501541 2.09214588,4.0863331 2.28797282,3.89050616 L3.89050616,2.28797282 C4.0863331,2.09214588 4.39501541,2.06654943 4.62042254,2.22744695 L6.36439033,3.47230592 C6.71305639,3.29073828 7.07766274,3.13973442 7.45521899,3.02081623 L7.80771705,0.906798939 C7.85327475,0.633578225 8.08967377,0.433333333 8.36666667,0.433333333 L10.6333333,0.433333333 C10.9103262,0.433333333 11.1467252,0.633578225 11.1922829,0.906798939 L11.544781,3.02081623 C11.9223373,3.13973442 12.2869436,3.29073828 12.6356097,3.47230592 L14.3795775,2.22744695 C14.6049229,2.06659343 14.9135096,2.09212703 15.1093522,2.28783121 L16.7130188,3.89036454 C16.9090245,4.08623165 16.9346355,4.39511888 16.773565,4.6205926 L15.5277625,6.36452178 C15.7092997,6.71314803 15.8602805,7.07771019 15.9791838,7.45521899 L18.0932011,7.80771705 Z M17.4333333,8.8466691 L15.4395323,8.51421628 C15.2181318,8.47729925 15.0393884,8.31318133 14.9837511,8.09572891 C14.8496405,7.57157153 14.6436595,7.07499154 14.3711339,6.61594655 C14.2564476,6.4227678 14.2667126,6.18007847 14.3973017,5.99727407 L15.5722161,4.35257711 L14.647576,3.42859046 L13.0025559,4.60281972 C12.819765,4.73329737 12.577167,4.74351366 12.3840535,4.62886611 C11.9250085,4.35634053 11.4284285,4.15035946 10.9042711,4.01624888 C10.6868187,3.96061164 10.5227008,3.78186824 10.4857837,3.56046773 L10.1533309,1.56666667 L8.8466691,1.56666667 L8.51421628,3.56046773 C8.47729925,3.78186824 8.31318133,3.96061164 8.09572891,4.01624888 C7.57157153,4.15035946 7.07499154,4.35634053 6.61594655,4.62886611 C6.42283299,4.74351366 6.18023496,4.73329737 5.99744413,4.60281972 L4.35256399,3.42869036 L3.42869036,4.35256399 L4.60281972,5.99744413 C4.73329737,6.18023496 4.74351366,6.42283299 4.62886611,6.61594655 C4.35634053,7.07499154 4.15035946,7.57157153 4.01624888,8.09572891 C3.96061164,8.31318133 3.78186824,8.47729925 3.56046773,8.51421628 L1.56666667,8.8466691 L1.56666667,10.1533309 L3.56046773,10.4857837 C3.78186824,10.5227008 3.96061164,10.6868187 4.01624888,10.9042711 C4.15035946,11.4284285 4.35634053,11.9250085 4.62886611,12.3840535 C4.74351366,12.577167 4.73329737,12.819765 4.60281972,13.0025559 L3.42869036,14.647436 L4.35256399,15.5713096 L5.99744413,14.3971803 C6.18023496,14.2667026 6.42283299,14.2564863 6.61594655,14.3711339 C7.07499154,14.6436595 7.57157153,14.8496405 8.09572891,14.9837511 C8.31318133,15.0393884 8.47729925,15.2181318 8.51421628,15.4395323 L8.8466691,17.4333333 L10.1533309,17.4333333 L10.4857837,15.4395323 C10.5227008,15.2181318 10.6868187,15.0393884 10.9042711,14.9837511 C11.4284285,14.8496405 11.9250085,14.6436595 12.3840535,14.3711339 C12.5772322,14.2564476 12.8199215,14.2667126 13.0027259,14.3973017 L14.6475629,15.5723161 L15.5714002,14.6484788 L14.3970936,13.0024345 C14.2666955,12.8196533 14.256514,12.5771205 14.3711339,12.3840535 C14.6436595,11.9250085 14.8496405,11.4284285 14.9837511,10.9042711 C15.0393884,10.6868187 15.2181318,10.5227008 15.4395323,10.4857837 L17.4333333,10.1533309 L17.4333333,8.8466691 Z M9.5,12.3333333 C7.93519321,12.3333333 6.66666667,11.0648068 6.66666667,9.5 C6.66666667,7.93519321 7.93519321,6.66666667 9.5,6.66666667 C11.0648068,6.66666667 12.3333333,7.93519321 12.3333333,9.5 C12.3333333,11.0648068 11.0648068,12.3333333 9.5,12.3333333 Z M9.5,11.3888889 C10.5432045,11.3888889 11.3888889,10.5432045 11.3888889,9.5 C11.3888889,8.45679547 10.5432045,7.61111111 9.5,7.61111111 C8.45679547,7.61111111 7.61111111,8.45679547 7.61111111,9.5 C7.61111111,10.5432045 8.45679547,11.3888889 9.5,11.3888889 Z"
      />
    </Svg>
  );
};

export default Settings;