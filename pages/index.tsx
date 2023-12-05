import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';

const Index: NextPage = () => {
  const pagesArray = [''];
  const hrefArray = ['/'];
  const fileLevel = 1;
  const title = 'Váš partner pro hru';
  const perex = 'Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer adip iscing elit. Nullam Lorem ipsum dolor sit amet, consectetuer.';

  return (
    <Box>
      <Header></Header>
      <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={true} />
      <ZigZag />
      <Footer/>
    </Box>
  );
};

export default Index;
