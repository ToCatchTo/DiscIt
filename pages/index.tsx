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
  const perex = '"Co to vlastně discgolf je?" Tato otázka může zajímat mnoho z vás, a na této stránce se dozvíte všechno, co potřebujete vědět o tomto krásném sportu. Ti, kteří již discgolf znají, si zde také mohou přijít na své s aplikací pro hraní.';

  return (
    <Box>
      <Header></Header>
      <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/background.jpg'} imgBg={true} />
      <ZigZag />
      <Box sx={{ pt: '30px' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Index;
