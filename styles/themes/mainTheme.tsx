import NextLink from 'next/link';
import { ThemeOptions } from '@mui/material/styles';
import { forwardRef } from 'react';

const LinkBehaviour = forwardRef(function LinkBehaviour(props, ref) {
  //@ts-ignore 
  return <NextLink ref={ref} {...props} />;
});

const primaryColor = '#FFFFFF';

const MainTheme: ThemeOptions = {
  palette: {
    primary: {
      main: primaryColor,
    },
  },
};

export default MainTheme;
