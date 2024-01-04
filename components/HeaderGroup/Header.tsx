import mainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Button, Drawer, Hidden, List, ListItem, ThemeProvider, useTheme } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { Logo } from '@/components/Logo';
import { HeaderButtonList } from './Header__ButtonList';
import { HeaderProfileButton } from './Header__ProfileButton';
import { NotLoggedButton } from './Header__NotLoggedButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { authUtils } from '@/firebase/authUtils';
import router from 'next/router';

export const Header = () => {

    let isLoggedIn = false;
    let loginState = localStorage.getItem('loginState');
    if (loginState == 'true')
        isLoggedIn = true;

    const [isOpen, setIsOpen] = useState(false);

    const handleDrawer = () => {
        setIsOpen(!isOpen);
    }

    const theme: any = useTheme();

    const handleLogout = () => {
        localStorage.setItem('loginState', 'false');
        authUtils.logout();
        router.push('/login');
    };

    return (
        <Box sx={{
            position: 'relative',
            backgroundColor: customColors.black,
            display: 'flex',
            width: '100%',
            height: '70px',
            alignItems: 'center',
            justifyContent: 'space-between',
            [theme.breakpoints.down('lg')]: { columnGap: '50px', padding: '0px 7%' },
            [theme.breakpoints.up('lg')]: { padding: generalVariables.contentPadding },
            zIndex: 1
        }}>
            <Box sx={{
                display: 'flex', alignItems: 'center',
                [theme.breakpoints.down('lg')]: { columnGap: '50px' },
                [theme.breakpoints.up('lg')]: { columnGap: '100px' },
            }}>
                <Box>
                    <Logo />
                </Box>
                <Hidden mdDown>
                    <Box>
                        <HeaderButtonList />
                    </Box>
                </Hidden>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '30px' }}>
                <Hidden mdUp>
                    <MenuIcon sx={{ height: '50px', width: '50px', color: customColors.white }} onClick={() => handleDrawer()} />
                </Hidden>
                <Drawer
                    anchor='top'
                    open={isOpen}
                    onClose={() => handleDrawer()}
                    sx={{ zIndex: 0 }}
                    PaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'flex-end' } }}
                >
                    <List sx={{
                        pt: '70px', backgroundColor: customColors.darkBackground, borderRadius: '10px',
                        [theme.breakpoints.up('sm')]: { width: '50%', mr: '30px' },
                        [theme.breakpoints.down('sm')]: { width: '100%', mr: '0px' }
                    }}>
                        <ListItem sx={{ height: '30px', margin: '5px 0px', flexWrap: 'wrap' }}>
                            <Button href='/profileDetail' sx={{ width: '100%', height: '100%', color: customColors.white, padding: '0px' }}>PROFIL</Button>
                        </ListItem>
                        <ListItem sx={{ height: '30px', margin: '5px 0px', flexWrap: 'wrap' }}>
                            <Button href='/about' sx={{ width: '100%', height: '100%', color: customColors.white, padding: '0px' }}>O HŘE</Button>
                        </ListItem>
                        <ListItem sx={{ height: '30px', margin: '5px 0px' }}>
                            <Button href='/mapPage' sx={{ width: '100%', height: '100%', color: customColors.white, padding: '0px' }}>HŘIŠTĚ</Button>
                        </ListItem>
                        <ListItem sx={{ height: '30px', margin: '5px 0px' }}>
                            <Button href='/gamesList' sx={{ width: '100%', height: '100%', color: customColors.white, padding: '0px' }}>ZÁZNAMY</Button>
                        </ListItem>
                        <ListItem sx={{ height: '30px', margin: '5px 0px' }}>
                            <Button href='/friends' sx={{ width: '100%', height: '100%', color: customColors.white, padding: '0px' }}>PŘÁTELÉ</Button>
                        </ListItem>
                        <ListItem sx={{ height: '30px', margin: '5px 0px', flexWrap: 'wrap' }}>
                            <Button href='#' sx={{ width: '100%', height: '100%', color: customColors.white, padding: '0px' }}>NASTAVENÍ</Button>
                        </ListItem>
                        <ListItem sx={{ height: '30px', margin: '5px 0px' }}>
                            <Button onClick={handleLogout} sx={{ width: '100%', height: '100%', color: customColors.white, padding: '0px' }}>ODHLÁSIT SE</Button>
                        </ListItem>
                    </List>
                </Drawer>
                <Hidden mdDown>
                    <Box>
                        {isLoggedIn ? <HeaderProfileButton /> : <NotLoggedButton />}
                    </Box>
                </Hidden>
            </Box>
        </Box>
    );
};