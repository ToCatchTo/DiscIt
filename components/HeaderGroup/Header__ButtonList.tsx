import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { HeaderButton } from './Header__Button';

export const HeaderButtonList = () => {

    return (
        <ThemeProvider theme={MainTheme}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', columnGap: '50px' }}>
                <Box sx={{}}>
                    <HeaderButton title='O hře'/>
                </Box>
                <Box sx={{}}>
                    <HeaderButton title='Hřiště'/>
                </Box>
                <Box sx={{}}>
                    <HeaderButton title='Záznamy'/>
                </Box>
                <Box sx={{}}>
                    <HeaderButton title='Přátelé'/>
                </Box>
            </Box>
        </ThemeProvider>
    );
};