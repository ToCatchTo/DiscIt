import mainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { Logo } from '@/components/Logo';
import { HeaderButtonList } from './Header__ButtonList';
import { HeaderProfileButton } from './Header__ProfileButton';

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
                        <HeaderProfileButton />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};