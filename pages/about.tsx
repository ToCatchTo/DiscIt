import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';

const About: NextPage = () => {
    const pagesArray = ['Domů', 'O hře'];
    const hrefArray = ['/', '/about'];
    const fileLevel = 2;

  return (
    <Box>
      <Header></Header>
      <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} picturePath={'/media/targets-header.png'} />
      <ZigZag />
      <Footer/>
    </Box>
  );
};

export default About;
