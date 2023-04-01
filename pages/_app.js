import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import React, { useState, useEffect } from 'react';
import { SWRConfig } from 'swr';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '@/components/Layout';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { lightMode, darkMode } from '../styles/themes';
import MuteContext from '@/components/MuteContext';

export const Context = React.createContext();

function App({ Component, pageProps: { session, ...pageProps } }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [isLightMode, setIsLightMode] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      setIsLightMode(storedTheme === 'lightMode');
    }
  }, []);

  useEffect(() => {
    if (isLightMode !== null) {
      localStorage.setItem('theme', isLightMode ? 'lightMode' : 'darkMode');
    }
  }, [isLightMode]);

  if (isLightMode === null) {
    return null;
  }

  const theme = isLightMode ? lightMode : darkMode;

  return (
    <SessionContextProvider
    supabaseClient={supabase}
    initialSession={pageProps.initialSession}
    >
      <MuteContext.Provider value={{ isMuted, setIsMuted }}>
      <Context.Provider value={[isLightMode, setIsLightMode]}>
        <ThemeProvider theme={theme}>
          <SWRConfig
            value={{
              refreshInterval: 5000,
            }}
            >
            <Layout>
              <CssBaseline />
              <Component {...pageProps} />
            </Layout>
          </SWRConfig>
        </ThemeProvider>
      </Context.Provider>
      </MuteContext.Provider>
    </SessionContextProvider>
  );
}
export default App;

