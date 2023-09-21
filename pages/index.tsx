import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';

const Index: NextPage = () => {

  return (
    <Box>
      <Header></Header>
      <Banner picturePath={'/media/targets-header.png'} />
      <ZigZag />
      <Footer/>
    </Box>
  );
};

export default Index;
