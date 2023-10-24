import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider, Typography } from '@mui/material';
import * as React from 'react';

export const Description = () => {

    return (
        <Box sx={{display: 'flex', alignItems: 'center', padding: '75px 0', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', width: '1072px', alignItems: 'center', flexDirection: 'column', pb: '75px'}}>
                <Typography sx={{fontSize: '36px', fontWeight: 'bold'}}>
                PRINCIP HRY
                </Typography>
                <Box sx={{width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black}}>
                </Box>
                <Typography sx={{fontSize: '18px', textAlign: 'center', maxWidth: '934px'}}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit 
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer. Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit 
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.
                </Typography>
            </Box>
            <Box sx={{display: 'flex', width: '1072px', alignItems: 'center', flexDirection: 'column', pb: '75px'}}>
                <Typography sx={{fontSize: '36px', fontWeight: 'bold'}}>
                PRAVIDLA
                </Typography>
                <Box sx={{width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black}}>
                </Box>
                <Typography sx={{fontSize: '18px', textAlign: 'center', maxWidth: '934px'}}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit 
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer. Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit 
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.
                </Typography>
            </Box>
            <Box sx={{display: 'flex', width: '1072px', alignItems: 'center', flexDirection: 'column', pb: '75px'}}>
                <Typography sx={{fontSize: '36px', fontWeight: 'bold'}}>
                HODY
                </Typography>
                <Box sx={{width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black}}>
                </Box>
                <Typography sx={{fontSize: '18px', textAlign: 'center', maxWidth: '934px'}}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit 
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer. Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit 
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.
                </Typography>
            </Box>
            <Box sx={{display: 'flex', width: '1072px', alignItems: 'center', flexDirection: 'column'}}>
                <Typography sx={{fontSize: '36px', fontWeight: 'bold'}}>
                DISKY
                </Typography>
                <Box sx={{width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black}}>
                </Box>
                <Typography sx={{fontSize: '18px', textAlign: 'center', maxWidth: '934px'}}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit 
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer. Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit 
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.
                </Typography>
            </Box>
        </Box>
    );
};