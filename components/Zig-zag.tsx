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
                            Jestli náhodou discgolf ještě neznáte, začít zde je nejlepší možnost. Zjistíte zde pravidla, způsob hry, různé typy disků a všechny informace potřebné pro tento sport.
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
                            Zde se můžete dozvědět o všech discgolfových hřištích v České Republice, včetně podrobností, jako je počet jamek, délka trasy a informace o tom, zda je hřiště přístupné pro veřejnost. Tak pojďte najít nejbližší hřiště a vyrazte.
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
                            Zde najdete všechny své uložené odehrané hry. Můžete si zobrazit detaily o každé hře a porovnat své výsledky s ostatními. Přece jenom není lepší pocit než vítězství po tvrdém výkonu.
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
                            Discgolf je zábava sám o sobě, ale s partou přátel je to ještě lepší! Zde si můžete prohlížet a přidávat přátele, se kterými si poté můžete užít společnou hru a soutěžit.
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
                            Tato část webu slouží jako praktický pomocník při hře. Pomáhá s počítáním bodů a ukládáním hry pro pozdější porovnání. Je však zobrazitelná pouze na mobilních zařízeních nebo tabletech, protože kdo by také hrál discgolf s notebookem v ruce, že ano?
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