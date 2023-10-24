import mainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { Logo } from '@/components/Logo';
import { HeaderButtonList } from './Header__ButtonList';
import { HeaderProfileButton } from './Header__ProfileButton';
import isLoggedIn from '@/pages/login';
import { NotLoggedButton } from './Header__NotLoggedButton';

export const Header = () => {

    return (
        <ThemeProvider theme={mainTheme} >
            <Box sx={{
                position: 'fixed',
                backgroundColor: customColors.black,
                display: 'flex',
                width: '100%',
                height: '70px',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: generalVariables.contentPadding,
                zIndex: 1,
            }}>
                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '100px'}}>
                    <Box>
                        <Logo />
                    </Box>
                    <Box>
                        <HeaderButtonList />
                    </Box>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', columnGap: '50px'}}> 
                    <Box>
                        { isLoggedIn ? <HeaderProfileButton /> : <NotLoggedButton />}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};