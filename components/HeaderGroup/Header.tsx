import mainTheme, { customColors, generalVariables } from '@/styles/themes/mainThemeOptions';
import { Box, Button, Drawer, Hidden, List, ListItem, ThemeProvider, useTheme } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { Logo } from '@/components/Logo';
import { HeaderButtonList } from './Header__ButtonList';
import { HeaderProfileButton } from './Header__ProfileButton';
import { NotLoggedButton } from './Header__NotLoggedButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { authUtils } from '@/firebase/authUtils';
import router from 'next/router';

export const Header = () => {
    let isLoggedIn = false;
    let loginState = localStorage.getItem('loginState');
    if (loginState == 'true')
        isLoggedIn = true;

    const [isOpen, setIsOpen] = useState(false);
    const [headerList, setHeaderList] = useState<Array<string>>([]);
    const [hrefList, setHrefList] = useState<Array<string>>([]);

    useEffect(() => {
        setHeaderList(isLoggedIn ? ["-- HRÁT! --", "PROFIL", "O HŘE", "HŘIŠTĚ", "ZÁZNAMY", "PŘÁTELÉ", "ODHLÁSIT SE"] : ["O HŘE", "HŘIŠTĚ", "PŘIHLÁSIT SE"]);
        setHrefList(isLoggedIn ? ["/lobby", "/profileDetail", "/about", "/mapPage", "/gamesList", "/friends"] : ["/about", "/mapPage", "/login"]);
    }, [isLoggedIn]);

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
            [theme.breakpoints.down('lg')]: { columnGap: '50px', padding: '0px 6%' },
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
                        {headerList.map((item: any, index: any) => (
                            <ListItem sx={{ height: '30px', margin: '5px 0px', flexWrap: 'wrap' }}>
                                {headerList[index] == "ODHLÁSIT SE" ?
                                    <Button onClick={handleLogout} sx={{ width: '100%', height: '100%', color: customColors.white, padding: '0px' }}>{headerList[index]}</Button>
                                    :   <Button href={hrefList[index]} sx={{ width: '100%', height: '100%', color: customColors.white, padding: '0px' }}>{headerList[index]}</Button>
                                }
                            </ListItem>
                        ))}
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