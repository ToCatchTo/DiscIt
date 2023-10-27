import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import {Logo} from '@/components/Logo';
import { FC } from 'react';
import Link from 'next/link';

export const NotLoggedButton = () => {
    const underlineAnimation = {
        '&:before': {
          content: "''",
          position: 'absolute',
          display: 'block',
          width: '100%',
          height: '2px',
          bottom: 0,
          left: 0,
          backgroundColor: customColors.white,
          transform: 'scaleX(0)',
          transition: 'transform 0.3s ease',
        },
        '&:hover': {
          // TODO dodělat animaci i na to když myš odjede
          color: customColors.white,
          transition: 'ease-in-out 0.3s',
        },
        '&:hover:before': {
          transform: 'scaleX(1)',
        },
      };

    return (
        <Button sx={{ borderRadius: 3.5 }}>
            <Link href='/login' style={{textDecoration: 'none'}}>
                <Typography sx={{color: customColors.white, fontSize: '22px', fontWeight: 'medium', ...underlineAnimation}} >
                        VYTVOŘIT ÚČET
                </Typography>
            </Link>
        </Button>
    );
};