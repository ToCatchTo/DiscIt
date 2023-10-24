import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, Box, ThemeProvider } from '@mui/material';
import mainTheme, { customColors } from '@/styles/themes/mainThemeOptions';
import Link from 'next/link';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { isLoggedIn } from '@/pages/login';

export const HeaderProfileButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleClickOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const logOffAction = {
    isLoggedIn: false
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Button onClick={handleClickOpen} sx={{ display: 'flex' }}>
        <AccountCircleIcon sx={{ height: '60px', width: '60px', color: customColors.white }} />
      </Button>
      <Box>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} sx={{ position: 'absolute'}}>
          <MenuItem sx={{...hover}}>
            <Link style={{color: customColors.white, textDecoration: 'none'}} href={'#'}>Profile</Link>
          </MenuItem>
          <MenuItem sx={{...hover}}>
            <Link style={{color: customColors.white, textDecoration: 'none'}} href={'#'}>Settings</Link>
          </MenuItem>
          <MenuItem sx={{...hover}}>
            <Link style={{color: customColors.white, textDecoration: 'none', ...logOffAction}} href={'/login'}>Logout</Link>
          </MenuItem>
        </Menu>
      </Box>
    </ThemeProvider>
  );
};
