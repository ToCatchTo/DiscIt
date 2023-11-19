import mainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider, Typography } from '@mui/material';
import * as React from 'react';
import { Logo } from './Logo';

export const Footer = () => {

    return (
        <Box sx={{backgroundColor: customColors.black, width: '100%', 
            height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center',
            columnGap: '50px'
        }}>
            <Logo/>
            <Box sx={{height: '60px', width: '5px', backgroundColor: customColors.white}}>

            </Box>
            <Typography sx={{fontSize: '20px', color: customColors.white, fontWeight: 'bold'}}>
                Made by Tomáš Terč
            </Typography>
        </Box>
    );
};