import MainTheme, { customColors } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import * as React from 'react';

// TODO předělat na reálný logo

export const Logo = () => { 

    return (
        <ThemeProvider theme={MainTheme}>
            <Link href={'/'} style={{textDecoration: 'none'}}>
                <Typography sx={{fontSize: '40px', color: customColors.white, fontWeight: 'bold'}}>
                    DiscIt
                </Typography>
            </Link>
        </ThemeProvider>
    );
};