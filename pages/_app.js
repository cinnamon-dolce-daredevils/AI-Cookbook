import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
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

function App({ Component, pageProps: { session, ...pageProps } }) {

  const [supabase] = useState(() => createBrowserSupabaseClient());

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
      }
    },
  });

  const themeSetter = purpleDirtyDark
  return (
    <ThemeProvider theme={themeSetter}>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Layout>
        <CssBaseline />
            <Component {...pageProps} />
      </Layout> 
      </SessionContextProvider>
    </ThemeProvider>
  );
}
export default App;
