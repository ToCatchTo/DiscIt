import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';

const MapPage: NextPage = () => {
  
  return (
    <Box>
      <Header></Header>
      <Box sx={{width: "100vw", height: '100vh'}}>
          <iframe src="https://www.google.com/maps/d/embed?mid=1l1e3vtbuWur1NVGMC9x0dx_tQTk&ehbc=2E312F" width="100%" height="100%"></iframe>
      </Box>
    </Box>
  );
};

export default MapPage;
