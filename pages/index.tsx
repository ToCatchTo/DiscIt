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
  const perex = 'Cože to vlastně discgolf je? Toto je otázka, kterou si možná mnohá z vás klade, tak na této stránce se dozvíte o tomto krásném sportu všechno co potřebujete vědět. Ti, kteří už discgolf znají tak si tu taky mohou přijít na své s aplikací na hraní.';

  return (
    <Box>
      <Header></Header>
      <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/banner-background.jpg'} imgBg={true} />
      <ZigZag />
      <Box sx={{ pt: '30px' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Index;
