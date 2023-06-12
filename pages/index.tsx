import { Header } from '@/components/HeaderGroup/Header';
import MainTheme from '@/styles/themes/mainTheme';
import { Box, ThemeProvider } from '@mui/material';
import { NextPage } from 'next';
import * as React from 'react';

const Index: NextPage = () => {

  return (
    <Box>
      <Header></Header>
    </Box>
  );
};

export default Index;
