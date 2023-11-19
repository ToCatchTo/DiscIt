import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, Box, ThemeProvider, Typography } from '@mui/material';
import mainTheme, { customColors } from '@/styles/themes/mainThemeOptions';
import Link from 'next/link';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { authUtils } from '@/firebase/authUtils';
import { useRouter } from 'next/router';

export const HeaderProfileButton = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();
  const currentUserEmail = localStorage.getItem('currentUserEmail');

  const hover = {
    "&:hover": {
      backgroundColor: customColors.darkBackground,
      transition: 'background-color 0.5s ease'
    },
    '&:not(:hover)': {
      backgroundColor: customColors.black,
      transition: 'background-color 0.5s ease'
    },
  };

  const handleLogout = () => {
    localStorage.setItem('loginState', 'false');
    authUtils.logout();
    router.push('/login');
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <Button onClick={handleClickOpen} sx={{ display: 'flex' }}>
        <AccountCircleIcon sx={{ height: '60px', width: '60px', color: customColors.white }} />
      </Button>
      <Box>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{ position: 'absolute'}}>
          <MenuItem sx={{fontWeight: 'bold', borderBottom: '2px solid ' + customColors.white, padding: '6px 16px'}}>
            <Typography sx={{}}>{currentUserEmail}</Typography>
          </MenuItem>
          <MenuItem sx={{...hover}}>
            <Link style={{color: customColors.white, textDecoration: 'none'}} href={'#'}>Profile</Link>
          </MenuItem>
          <MenuItem sx={{...hover}}>
            <Link style={{color: customColors.white, textDecoration: 'none'}} href={'#'}>Settings</Link>
          </MenuItem>
          <MenuItem sx={{...hover}}>
            <Link style={{color: customColors.white, textDecoration: 'none'}} href={'/login'} onClick={handleLogout}>Logout</Link>
          </MenuItem>
        </Menu>
      </Box>
    </ThemeProvider>
  );
};
