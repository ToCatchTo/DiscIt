import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainTheme';
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
    const {title} = props;

    return (
        <ThemeProvider theme={MainTheme}>
            <Link href={'#'} style={{textDecoration: 'none'}}>
                <Typography sx={{color: customColors.text, fontSize: '30px', fontWeight: 'medium'}}>
                        {title}
                </Typography>
            </Link>
        </ThemeProvider>
    );
};