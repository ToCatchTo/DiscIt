import MainTheme from '@/styles/themes/mainTheme';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';

export const Header = () => {

    return (
        <ThemeProvider theme={MainTheme} >
            <Box sx={{ position: 'fixed', backgroundColor: 'primary.main', display: 'flex', width: '100%', height: '80px', justifyContent: 'space-between' }}>
                <Box>
                    <Box>

                    </Box>
                    <Box>

                    </Box>
                </Box>
                <Box>

                </Box>
            </Box>
        </ThemeProvider>
    );
};