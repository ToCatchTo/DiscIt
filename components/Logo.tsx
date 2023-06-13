import MainTheme from '@/styles/themes/mainTheme';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';

// TODO předělat na reálný logo

export const Logo = () => { 

    return (
        <ThemeProvider theme={MainTheme} >
            <Typography sx={{fontSize: '60px', color: 'secondary.main', fontWeight: 'bold'}}>
                DiscIt
            </Typography>
        </ThemeProvider>
    );
};