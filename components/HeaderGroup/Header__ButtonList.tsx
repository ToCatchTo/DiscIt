import MainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Hidden, ThemeProvider } from '@mui/material';
import { HeaderButton } from './Header__Button';
import { useTheme } from '@mui/material/styles';

export const HeaderButtonList = () => {
    let isLoggedIn = false;
    let loginState = localStorage.getItem('loginState');
    if (loginState == 'true')
        isLoggedIn = true;
    
    const theme = useTheme();

    return (
        <ThemeProvider theme={MainTheme}>
            <Hidden>
                <Box sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                    [theme.breakpoints.down('lg')]: { columnGap: '30px' }, 
                    [theme.breakpoints.up('lg')]: { columnGap: '50px' },
                }}>
                    <Box sx={{}}>
                        <HeaderButton href='/about' title='O hře' />
                    </Box>
                    <Box sx={{}}>
                        <HeaderButton href='/mapPage' title='Hřiště' />
                    </Box>
                    <Box sx={{}}>
                        {isLoggedIn ? <HeaderButton href='/gamesList' title='Záznamy' /> : <Box></Box>}
                    </Box>
                    <Box sx={{}}>
                        {isLoggedIn ? <HeaderButton href='/friends' title='Přátelé' /> : <Box></Box>}
                    </Box>
                    {/* <Hidden lgUp>
                        <Box sx={{}}>
                            { isLoggedIn ? <HeaderButton href='#' title='Začít hru'/> : <Box></Box>}
                        </Box>
                    </Hidden> */}
                </Box>
            </Hidden>
        </ThemeProvider>
    );
};