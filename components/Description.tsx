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
            <Box sx={{
                display: 'flex', alignItems: 'center', flexDirection: 'column', pb: '75px',
                [theme.breakpoints.down('md')]: { pb: '40px' },
            }}>
                <Typography sx={{
                    fontSize: '36px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: { fontSize: '32px' },
                }}>
                    PŮVOD SPORTU
                </Typography>
                <Box sx={{
                    width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black,
                    [theme.breakpoints.down('md')]: { mt: '12px', mb: '16px' },
                }}>
                </Box>
                <Typography sx={{
                    fontSize: '18px', textAlign: 'center', maxWidth: '934px',
                    [theme.breakpoints.down('md')]: { fontSize: '16px' },
                }}>
                    Sport discgolf vznikl v Americe v 70. letech. Ed Headrick je považován z většiny za vynálezce tohoto sportu díky svým dvoum patentům, kterými je návrh disku (frisbee) a návrh koše (jamky) do, které se při hře snažíme trefit. Sport se postupně s dobou do Evropy a nabývá na popularitě každým dnem.
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex', alignItems: 'center', flexDirection: 'column', pb: '75px',
                [theme.breakpoints.down('md')]: { pb: '40px' },
            }}>
                <Typography sx={{
                    fontSize: '36px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: { fontSize: '32px' },
                }}>
                    PRINCIP HRY
                </Typography>
                <Box sx={{
                    width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black,
                    [theme.breakpoints.down('md')]: { mt: '12px', mb: '16px' },
                }}>
                </Box>
                <Typography sx={{
                    fontSize: '18px', textAlign: 'center', maxWidth: '934px',
                    [theme.breakpoints.down('md')]: { fontSize: '16px' },
                }}>
                    Princip hry spočívá v tom dostat disk do kovového koše za co nejméně hodů. Zní to jednoduše, ale jednoduché to není. Záleží na mnoha věcech jako typ disku, který si zvolíte, stylu hodu, jakou zvolíte strategii, stav větru. Zde najdete nějáké typy a strategie co zvolit, abyste dosáhli co nejlepšíhých výsledků.
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex', alignItems: 'center', flexDirection: 'column', pb: '75px',
                [theme.breakpoints.down('md')]: { pb: '40px' },
            }}>
                <Typography sx={{
                    fontSize: '36px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: { fontSize: '32px' },
                }}>
                    PRAVIDLA
                </Typography>
                <Box sx={{
                    width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black,
                    [theme.breakpoints.down('md')]: { mt: '12px', mb: '16px' },
                }}>
                </Box>
                <Typography sx={{
                    fontSize: '18px', textAlign: 'center', maxWidth: '934px',
                    [theme.breakpoints.down('md')]: { fontSize: '16px' },
                }}>
                    Pravidla jsou velice podobná golfu. Hráč postupuje postupně po jednotlivých jamkách a na každé se snaží dostat disk do ocelového koše za co nejméně hodů. Na každé jamce je určené startovací plošinou kde má hráč začít házet. Poté když každý odhodí svůj první hod tak se přesunou k místu kde disk spadl a hazí znova. Při prvním hodu je pořadí rozhodováno podle toho kdo hodil méně na předchozí jamce. A když hra započne tak hráči hrájí v pořádí toho jak daleko jsou od koše, aby neházeli po sobě navzájem. Když hráč dostane disk do koše, tak si spočítá počet hodů tak, že vezme PAR jamky a odečte od počtu hodů na té jamce. A také při hře je každá jamka ohraničená hranicí (outem) a když hráč hodí disk za tuto hranici, tak bude házet další kolo hodů z místa, kde disk překročil hranici a přičte si jeden hod navíc.
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex', alignItems: 'center', flexDirection: 'column', pb: '75px',
                [theme.breakpoints.down('md')]: { pb: '40px' },
            }}>
                <Typography sx={{
                    fontSize: '36px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: { fontSize: '32px' },
                }}>
                    STYLY HODŮ
                </Typography>
                <Box sx={{
                    width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black,
                    [theme.breakpoints.down('md')]: { mt: '12px', mb: '16px' },
                }}>
                </Box>
                <Typography sx={{
                    fontSize: '18px', textAlign: 'center', maxWidth: '934px',
                    [theme.breakpoints.down('md')]: { fontSize: '16px' },
                }}>
                    V discgolfu jsou 2 hlavní styly hodů: backhand a forhand. Při backhandu se hráč postaví napřed tím bokem, kde má dominantní rukou, kterou hází a disk se točí po směru hodinových ručiček a nakonec se vždy stočí doleva. Naopak při forehand se hráč postaví napřed bokem, kde nemá dominantní ruku a tímto hodem se disk točí proti směru hodinových ručiček a stočí se doprava.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography sx={{
                    fontSize: '36px', fontWeight: 'bold',
                    [theme.breakpoints.down('md')]: { fontSize: '32px' },
                }}>
                    DISKY
                </Typography>
                <Box sx={{
                    width: '100%', height: '2px', mt: '16px', mb: '20px', backgroundColor: customColors.black,
                    [theme.breakpoints.down('md')]: { mt: '12px', mb: '16px' },
                }}>
                </Box>
                <Typography sx={{
                    fontSize: '18px', textAlign: 'center', maxWidth: '934px',
                    [theme.breakpoints.down('md')]: { fontSize: '16px' },
                }}>
                    Existují 3 druhy disků: drivery, midrange a puttery. Drivery jsou lehké disky s ostrými hranami a používají se na daleké hody. Midrange je takový všestranný a používá se na střední hody. A poslední je putter, který je těžký a používá se na poslední hody, kde se snažíte už dostat disk přímo do koše. Každý disk ma pak také 4 parametry, které můžete vidět napsané na diskách. Jsou zapsané jako čísla a jsou v tomto pořadí: rychlost, plachtění, počáteční sklon a konečný sklon. 
                </Typography>
            </Box>
        </Box >
    );
};