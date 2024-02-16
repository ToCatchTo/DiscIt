import MainTheme, { customColors } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider, Typography, useTheme } from '@mui/material';
import { NextPage } from 'next';
import Link from 'next/link';
import * as React from 'react';

// TODO předělat na reálný logo

export const Logo = () => {

    const theme: any = useTheme();

    return (
        <ThemeProvider theme={MainTheme}>
            <Link href={'/'} style={{ textDecoration: 'none' }}>
                <Typography sx={{
                    fontSize: '40px', color: customColors.white, fontWeight: 'bold',
                    [theme.breakpoints.down(480)]: { fontSize: '32px' },
                }}>
                    Discit
                </Typography>
            </Link>
        </ThemeProvider>
    );
};