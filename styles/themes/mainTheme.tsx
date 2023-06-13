import NextLink from 'next/link';
import { ThemeOptions } from '@mui/material/styles';
import { forwardRef } from 'react';

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  //@ts-ignore 
  return <NextLink ref={ref} {...props} />;
});
// main color
const primaryColor = '#116466';
const lightPrimaryColor = '#2B7E80';
const darkPrimaryColor = '#004B4D';
// secondary color
const secondaryColor = '#FFB57C';
const lightSecondaryColor = '';
const darkSecondaryColor = '';
// custom colors
export const customColors = {
  black: '#000000',
  white: '#FFFFFF',
  error: '#F84F31',
  success: '#23C552',
  text: '#D1E8E2',
  darkBackground: '#2C3531',
  lightBackground: '#E4E4E4'
}

export const breakpoints = {
  xLarge: '1500px',
  Large: '1280px',
  Medium: '960px',
  Small: '640px',
  Tiny: '480px'
}

export const generalVariables = {
  contentPadding: '0px 140px'
}

const MainTheme: ThemeOptions = {
  palette: {
    primary: {
      main: primaryColor,
      light: lightPrimaryColor,
      dark: darkPrimaryColor
    },
    secondary: {
      main: secondaryColor,
      light: lightSecondaryColor,
      dark: darkSecondaryColor
    }
  }
};

export default MainTheme;
