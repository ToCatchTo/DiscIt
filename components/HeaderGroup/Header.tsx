import MainTheme, { generalVariables } from '@/styles/themes/mainTheme';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { Logo } from '@/components/Logo';
import { HeaderButtonList } from './Header__ButtonList';

export const Header = () => {

    return (
        <ThemeProvider theme={MainTheme} >
            <Box sx={{
                position: 'fixed',
                backgroundColor: 'primary.main',
                display: 'flex',
                width: '100%',
                height: '80px',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: generalVariables.contentPadding,
            }}>
                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '100px'}}>
                    <Box>
                        <Logo />
                    </Box>
                    <Box>
                        <HeaderButtonList />
                    </Box>
                </Box>
                <Box>

                </Box>
            </Box>
        </ThemeProvider>
    );
};