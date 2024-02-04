import { Header } from '@/components/HeaderGroup/Header';
import { Banner } from '@/components/Banner';
import MainTheme from '@/styles/themes/mainThemeOptions';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';
import { ZigZag } from '@/components/Zig-zag';
import { Footer } from '@/components/Footer';
import { Description } from '@/components/Description';

const About: NextPage = () => {
  const pagesArray = ['Domů', 'O hře'];
  const hrefArray = ['/', '/about'];
  const fileLevel = 2;
  const title = 'O hře';
  const perex = 'Jestli náhodou discgolf ještě neznáte, začít zde je nejlepší možnost. Zjistíte zde pravidla, způsob hry, různé typy disků a všechny informace potřebné pro tento sport.';

  return (
    <Box>
      <Header></Header>
      <Banner level={fileLevel} href={hrefArray} pageName={pagesArray} title={title} perex={perex} picturePath={'/media/background.jpg'} imgBg={true} />
      <Description></Description>
      <Box sx={{ pt: '30px' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default About;
