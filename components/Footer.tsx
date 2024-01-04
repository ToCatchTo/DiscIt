import mainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider, Typography, useTheme } from '@mui/material';
import * as React from 'react';
import { Logo } from './Logo';

export const Footer = () => {
    const theme: any = useTheme();

    return (
        <Box sx={{
            backgroundColor: customColors.black, width: '100%',
            height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: '50px',
            [theme.breakpoints.down(480)]: { height: '60px', columnGap: '30px' },
        }}>
            <Logo />
            <Box sx={{
                height: '60px', width: '5px', backgroundColor: customColors.white,
                [theme.breakpoints.down(480)]: { height: '40px', width: '3px' },
            }}>
            </Box>
            <Typography sx={{
                fontSize: '20px', color: customColors.white, fontWeight: 'bold',
                [theme.breakpoints.down(480)]: {fontSize: '16px'}
        }}>
            Made by Tomáš Terč
        </Typography>
        </Box >
    );
};