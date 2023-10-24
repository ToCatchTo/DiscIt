import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import {Logo} from '@/components/Logo';
import { FC } from 'react';
import Link from 'next/link';

export const NotLoggedButton = () => {
    return (
        <Button sx={{ borderRadius: 3.5 }}>
            <Link href='/login' style={{textDecoration: 'none'}}>
                <Typography sx={{color: customColors.white, fontSize: '22px', fontWeight: 'medium'}} >
                        VYTVOŘIT ÚČET
                </Typography>
            </Link>
        </Button>
    );
};