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
const lightSecondaryColor = '#FFFFFF';
const darkSecondaryColor = '#000000';
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

const mainTheme: ThemeOptions = {
  palette: {
    grey: {
      800: '#555555',
    },
    primary: {
      main: '#116466',
      light: '#2B7E80',
      dark: '#004B4D'
    },
    secondary: {
      main: secondaryColor,
      light: lightSecondaryColor,
      dark: darkSecondaryColor
    },
    info: {
      main: '#000000',
      light: lightSecondaryColor,
      dark: darkSecondaryColor
    },
    warning: {
      main: secondaryColor,
      light: lightSecondaryColor,
      dark: darkSecondaryColor
    },
    success: {
      main: secondaryColor,
      light: lightSecondaryColor,
      dark: darkSecondaryColor
    },
    error: {
      main: secondaryColor,
      light: lightSecondaryColor,
      dark: darkSecondaryColor
    },
    text: {
      primary: customColors.black,
    },
    action: {
      hoverOpacity: 0.
    },
    background: {
      paper: '#000000'
    }
  },
};

export default mainTheme;
