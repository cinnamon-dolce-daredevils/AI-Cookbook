import * as React from 'react';
import { ThemeProvider } from '@mui/material';
// below are just roboto fonts from google
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '@/components/Layout';
//imports theme
import { CssBaseline, createTheme } from '@mui/material';
import { green, purple } from '@mui/material/colors';


function App({ Component, pageProps: { session, ...pageProps } }) {

  const purpleDirtyDark = createTheme({
    palette: {
      theme: 'dark',
      primary: {
        main: '#8e24aa',
      },
      secondary: {
        main: '#43a047',
      },
      background: {
        default: '#212121',
      },
      text: {
        primary: '#fafafa',
        secondary: '#eeeeee',
        disabled: '#9e9e9e',
        hint: '#eeeeee',
      },
    },
  });

  const themeSetter = purpleDirtyDark
  return (
    <ThemeProvider theme={themeSetter}>
      <Layout>
        
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
