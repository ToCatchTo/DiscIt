import * as React from 'react';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme, useTheme } from '@mui/material';
import { getApolloClient } from '../utility/apollo-client';
import { AuthContextProvider } from '@/components/AuthContextProvider';
import { ApolloProvider } from '@apollo/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../utility/createEmotionCache';
import mainThemeOptions from '../styles/themes/mainThemeOptions';

// Cache
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const clientSideEmotionCache = createEmotionCache();

// Vytvoření globální promměné theme
const mainTheme = createTheme(mainThemeOptions);

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const client = getApolloClient({ forceNew: false });

  return (
    <AuthContextProvider>
      <ApolloProvider client={client}>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={mainTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </CacheProvider>
      </ApolloProvider>
    </AuthContextProvider>
  );
};

export default MyApp;