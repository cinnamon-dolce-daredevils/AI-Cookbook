import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
// below are just roboto fonts from google
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '@/components/Layout';
//imports theme
import { createTheme, ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { purple } from '@mui/material/colors';
import { MyProvider } from './myState';


function App({ Component, pageProps: { session, ...pageProps } }) {
const [supabase] = useState(() => createBrowserSupabaseClient());

  const purpleDirtyDark = createTheme({
    palette: {
      // 'mode' is outdated. needs to be called theme
      mode: 'light',
      primary: {
        main: purple[600],
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
      <MyProvider>
      <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Layout>
        <CssBaseline />
            <Component {...pageProps} />
      </Layout> 
      </SessionContextProvider>
      </MyProvider>
    </ThemeProvider>
  );
}
export default App;
