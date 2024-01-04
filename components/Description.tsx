import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider, Typography, useTheme } from '@mui/material';
import * as React from 'react';

export const Description = () => {

    const theme: any = useTheme();

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', padding: '75px 0', flexDirection: 'column',
            [theme.breakpoints.down('md')]: { padding: '40px 7%' },
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', pb: '75px',
            [theme.breakpoints.down('md')]: { pb: '40px' },
        }}>
                <Typography sx={{
                    fontSize: '36px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: { fontSize: '32px' },
                }}>
                    PRINCIP HRY
                </Typography>
                <Box sx={{ width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black,
                        [theme.breakpoints.down('md')]: { mt: '12px', mb: '16px' },
            }}>
                </Box>
                <Typography sx={{
                    fontSize: '18px', textAlign: 'center', maxWidth: '934px',
                    [theme.breakpoints.down('md')]: { fontSize: '16px' },
                }}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer. Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', pb: '75px',
            [theme.breakpoints.down('md')]: { pb: '40px' },
        }}>
                <Typography sx={{
                    fontSize: '36px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: { fontSize: '32px' },
                }}>
                    PRAVIDLA
                </Typography>
                <Box sx={{ width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black,
                        [theme.breakpoints.down('md')]: { mt: '12px', mb: '16px' },
            }}>
                </Box>
                <Typography sx={{
                    fontSize: '18px', textAlign: 'center', maxWidth: '934px',
                    [theme.breakpoints.down('md')]: { fontSize: '16px' },
                }}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer. Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', pb: '75px',
            [theme.breakpoints.down('md')]: { pb: '40px' },
        }}>
                <Typography sx={{
                    fontSize: '36px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: { fontSize: '32px' },
                }}>
                    HODY
                </Typography>
                <Box sx={{ width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black,
                        [theme.breakpoints.down('md')]: { mt: '12px', mb: '16px' },
            }}>
                </Box>
                <Typography sx={{
                    fontSize: '18px', textAlign: 'center', maxWidth: '934px',
                    [theme.breakpoints.down('md')]: { fontSize: '16px' },
                }}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer. Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography sx={{
                    fontSize: '36px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: { fontSize: '32px' },
                }}>
                    DISKY
                </Typography>
                <Box sx={{ width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black,
                        [theme.breakpoints.down('md')]: { mt: '12px', mb: '16px' },
            }}>
                </Box>
                <Typography sx={{
                    fontSize: '18px', textAlign: 'center', maxWidth: '934px',
                    [theme.breakpoints.down('md')]: { fontSize: '16px' },
                }}>
                    Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer. Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit
                    amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.
                </Typography>
            </Box>
        </Box >
    );
};