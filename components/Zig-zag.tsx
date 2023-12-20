import mainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider, Typography, useTheme } from '@mui/material';
import * as React from 'react';

export const ZigZag = () => {
    const theme: any = useTheme();

    return (
        <ThemeProvider theme={mainTheme} >
            <Box sx={{ display: 'flex', flexDirection: 'column', 
                [theme.breakpoints.down('md')]: { rowGap: '50px', padding: '0 7%', margin: '50px 0'},
                [theme.breakpoints.up('md')]: { rowGap: '100px', padding: generalVariables.contentPadding, margin: '100px 0'},
        }}>
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between',
                    [theme.breakpoints.down('md')]: { flexDirection: 'column-reverse', rowGap: '30px' },
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', justifyContent: 'center',
                        [theme.breakpoints.down('md')]: { width: '100%'},
                        [theme.breakpoints.up('md')]: { width: '49.8%'},
                }}>
                        <Typography sx={{ fontWeight: 'bold',
                        [theme.breakpoints.down('md')]: { fontSize: '28px'},
                        [theme.breakpoints.up('md')]: { fontSize: '32px'},
                    }}>
                            O HŘE
                        </Typography>
                        <Typography sx={{ 
                            [theme.breakpoints.down('md')]: { fontSize: '16px'},
                            [theme.breakpoints.up('md')]: { fontSize: '22px'},
                         }}>
                            Lorem ipsum dolor sit amet, consectetuer adip iscing elit.
                            Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit.
                            Nullam Lorem ipsum dolor sit amet, consectetuer.
                        </Typography>
                    </Box>
                    <Box sx={{
                        borderRadius: '5px', overflow: 'hidden',
                        [theme.breakpoints.down('md')]: { width: '100%' },
                        [theme.breakpoints.up('md')]: { width: '41.5%' },
                    }}>
                        <Box component='img' src="/media/targets-header.png" sx={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex', justifyContent: 'space-between',
                    [theme.breakpoints.down('md')]: { flexDirection: 'column', rowGap: '30px' },
                }}>
                    <Box sx={{
                        borderRadius: '5px', overflow: 'hidden',
                        [theme.breakpoints.down('md')]: { width: '100%' },
                        [theme.breakpoints.up('md')]: { width: '41.5%' },
                    }}>
                        <Box component='img' src="/media/targets-header.png" sx={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', justifyContent: 'center',
                        [theme.breakpoints.down('md')]: { width: '100%'},
                        [theme.breakpoints.up('md')]: { width: '49.8%'},
                }}>
                        <Typography sx={{ fontWeight: 'bold',
                        [theme.breakpoints.down('md')]: { fontSize: '28px'},
                        [theme.breakpoints.up('md')]: { fontSize: '32px'},
                    }}>
                            HŘIŠTĚ
                        </Typography>
                        <Typography sx={{ 
                            [theme.breakpoints.down('md')]: { fontSize: '16px'},
                            [theme.breakpoints.up('md')]: { fontSize: '22px'},
                         }}>
                            Lorem ipsum dolor sit amet, consectetuer adip iscing elit.
                            Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit.
                            Nullam Lorem ipsum dolor sit amet, consectetuer.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex', justifyContent: 'space-between',
                    [theme.breakpoints.down('md')]: { flexDirection: 'column-reverse', rowGap: '30px' },
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', justifyContent: 'center',
                        [theme.breakpoints.down('md')]: { width: '100%'},
                        [theme.breakpoints.up('md')]: { width: '49.8%'},
                }}>
                        <Typography sx={{ fontWeight: 'bold',
                        [theme.breakpoints.down('md')]: { fontSize: '28px'},
                        [theme.breakpoints.up('md')]: { fontSize: '32px'},
                    }}>
                            ZÁZNAMY
                        </Typography>
                        <Typography sx={{ 
                            [theme.breakpoints.down('md')]: { fontSize: '16px'},
                            [theme.breakpoints.up('md')]: { fontSize: '22px'},
                         }}>
                            Lorem ipsum dolor sit amet, consectetuer adip iscing elit.
                            Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit.
                            Nullam Lorem ipsum dolor sit amet, consectetuer.
                        </Typography>
                    </Box>
                    <Box sx={{
                        borderRadius: '5px', overflow: 'hidden',
                        [theme.breakpoints.down('md')]: { width: '100%' },
                        [theme.breakpoints.up('md')]: { width: '41.5%' },
                    }}>
                        <Box component='img' src="/media/targets-header.png" sx={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex', justifyContent: 'space-between',
                    [theme.breakpoints.down('md')]: { flexDirection: 'column', rowGap: '30px' },
                }}>
                    <Box sx={{
                        borderRadius: '5px', overflow: 'hidden',
                        [theme.breakpoints.down('md')]: { width: '100%' },
                        [theme.breakpoints.up('md')]: { width: '41.5%' },
                    }}>
                        <Box component='img' src="/media/targets-header.png" sx={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', justifyContent: 'center',
                        [theme.breakpoints.down('md')]: { width: '100%'},
                        [theme.breakpoints.up('md')]: { width: '49.8%'},
                }}>
                        <Typography sx={{ fontWeight: 'bold',
                        [theme.breakpoints.down('md')]: { fontSize: '28px'},
                        [theme.breakpoints.up('md')]: { fontSize: '32px'},
                    }}>
                            PŘÁTELÉ
                        </Typography>
                        <Typography sx={{ 
                            [theme.breakpoints.down('md')]: { fontSize: '16px'},
                            [theme.breakpoints.up('md')]: { fontSize: '22px'},
                         }}>
                            Lorem ipsum dolor sit amet, consectetuer adip iscing elit.
                            Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit.
                            Nullam Lorem ipsum dolor sit amet, consectetuer.
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
};