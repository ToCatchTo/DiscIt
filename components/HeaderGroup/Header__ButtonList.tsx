import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { HeaderButton } from './Header__Button';

export const HeaderButtonList = () => {

    return (
        <ThemeProvider theme={MainTheme}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', columnGap: '50px' }}>
                <Box sx={{}}>
                    <HeaderButton href='/about' title='O hře'/>
                </Box>
                <Box sx={{}}>
                    <HeaderButton href='#' title='Hřiště'/>
                </Box>
                <Box sx={{}}>
                    <HeaderButton href='#' title='Záznamy'/>
                </Box>
                <Box sx={{}}>
                    <HeaderButton href='#' title='Přátelé'/>
                </Box>
            </Box>
        </ThemeProvider>
    );
};