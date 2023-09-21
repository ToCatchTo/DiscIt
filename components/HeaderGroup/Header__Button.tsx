import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider, Typography } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import {Logo} from '@/components/Logo';
import { FC } from 'react';
import Link from 'next/link';

type Props = {
    title: string
};

export const HeaderButton: FC<Props> = (props) => {
    let {title} = props;

    title = title.toUpperCase();

    return (
        <ThemeProvider theme={MainTheme}>
            <Link href={'#'} style={{textDecoration: 'none'}}>
                <Typography sx={{color: customColors.white, fontSize: '22px', fontWeight: 'medium'}} >
                        {title}
                </Typography>
            </Link>
        </ThemeProvider>
    );
};