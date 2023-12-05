import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { HeaderButton } from './Header__Button';

export const HeaderButtonList = () => {
    let isLoggedIn = false;
    let loginState = localStorage.getItem('loginState');
    if(loginState == 'true')
        isLoggedIn = true;

    return (
        <ThemeProvider theme={MainTheme}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', columnGap: '50px' }}>
                <Box sx={{}}>
                    <HeaderButton href='/about' title='O hře'/>
                </Box>
                <Box sx={{}}>
                    <HeaderButton href='/mapPage' title='Hřiště'/>
                </Box>
                <Box sx={{}}>
                    { isLoggedIn ? <HeaderButton href='#' title='Záznamy'/> : <Box></Box>}
                </Box>
                <Box sx={{}}>
                    { isLoggedIn ? <HeaderButton href='/friends' title='Přátelé'/> : <Box></Box>}
                </Box>

            </Box>
        </ThemeProvider>
    );
};