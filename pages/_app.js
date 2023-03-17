import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
// below are just roboto fonts from google
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//imports theme
import { createTheme, CssBaseline } from '@mui/material';
const theme = createTheme({
  palette: {
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#000000',
    },
  },
});
function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
            <Component {...pageProps} />
          </SessionContextProvider>
      </ThemeProvider>
    </Layout>
  );
}

export default App;
