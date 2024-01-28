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
                        [theme.breakpoints.down(480)]: { textAlign: 'center', alignItems: 'center' },
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
                            Jestli je ještě discgolf náhodou neznáte, tak bude nejlepší když začnete zde. Zjistíte tu jaká jsou pravidla, jak se hraje, jaké jsou typy disků a všechno potřebné pro hru.
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
                        [theme.breakpoints.down(480)]: { textAlign: 'center', alignItems: 'center' },
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
                            Zde se můžete dozvědět o všech hřištích v České Republice, jejich podrobných parametrech jako je počet jamek, délka nebo i také jestli je hřiště přístupné pro veřejnost. Tak pojďte najděte nejbližší hřiště a vyražte.
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{
                    display: 'flex', justifyContent: 'space-between',
                    [theme.breakpoints.down('md')]: { flexDirection: 'column-reverse', rowGap: '30px' },
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', justifyContent: 'center',
                        [theme.breakpoints.down(480)]: { textAlign: 'center', alignItems: 'center' },
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
                            Zde najdete všechny svoje uložené odehrané hry, můžete si zobrazit detaily o hře a porovnat s ostatními. Přece jenom není lepší pocit než je vítězství po tvrdém výkonu.
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
                        [theme.breakpoints.down(480)]: { textAlign: 'center', alignItems: 'center' },
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
                            Discgolf je zábava sám o sobě, ale s partou přátel to je ještě lepší! Zde si můžete zobrazit a přidat přátel se, kterými si poté můžete užít společnou hru a zasoupeřit.
                        </Typography>
                    </Box>
                </Box>
                
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between',
                    [theme.breakpoints.down('md')]: { flexDirection: 'column-reverse', rowGap: '30px' },
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '15px', justifyContent: 'center',
                        [theme.breakpoints.down(480)]: { textAlign: 'center', alignItems: 'center' },
                        [theme.breakpoints.down('md')]: { width: '100%'},
                        [theme.breakpoints.up('md')]: { width: '49.8%'},
                }}>
                        <Typography sx={{ fontWeight: 'bold',
                        [theme.breakpoints.down('md')]: { fontSize: '28px'},
                        [theme.breakpoints.up('md')]: { fontSize: '32px'},
                    }}>
                            APLIKACE NA HRANÍ
                        </Typography>
                        <Typography sx={{ 
                            [theme.breakpoints.down('md')]: { fontSize: '16px'},
                            [theme.breakpoints.up('md')]: { fontSize: '22px'},
                         }}>
                            Tato část webu slouží jako takový pomocník při hře. Pomáhá při počítání bodů a uložení hry k pozdějšímu porovnání. Je, ale zobrazitelný pouze na mobilu nebo tabletu, protože kdo by také hrál discgolf s notebookem ruce přece.
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
            </Box>
        </ThemeProvider>
    );
};