import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
// below are roboto fonts from google
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '@/components/Layout';
//imports theme
import { ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {lightMode, darkMode} from '../styles/themes'

function App({ Component, pageProps: { session, mode,  ...pageProps } }) {
const [supabase] = useState(() => createBrowserSupabaseClient());
const [newTheme, setNewTheme] = useState('light')

  const themeSetter = lightMode
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
