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
  darkBackground: '#0b0e0d',
  lightBackground: '#E4E4E4'
}

export const generalVariables = {
  contentPadding: '0px 13%',
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
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: customColors.black + '!important',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            border: '1px solid black',
          },
          '& input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px ' + customColors.white + ' inset',
            '-webkit-text-fill-color': customColors.black,
          },
          '&.Mui-focused' : {
            borderColor: customColors.black + '!important',
          }
        },
        notchedOutline: {
          borderColor: customColors.black + '!important',
        }
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused' : {
            color: customColors.black + '!important',
          }
        },
      },
    },
    MuiPaper: { 
      styleOverrides: {
        root: {
          color: customColors.white + '!important',
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }
    }
  },
};

export default mainTheme;
