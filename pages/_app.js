import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import * as React from 'react';
import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { ThemeProvider, Typography } from '@mui/material';
// below are just roboto fonts from google
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
//imports theme
import { CssBaseline, createTheme } from '@mui/material';
import { orange, blue, red } from '@mui/material/colors';

// import toggle
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import switch
import Switch from '@mui/material/Switch';

function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  // theme selector
  const [alignment, setAlignment] = React.useState('web');
const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  
    
  const purpleDrankKing = createTheme({
    palette: {
      mode: 'light',
      primary: {
        // a light purple
        main: '#7e57c2',
      },
      secondary: {
        // a grassy green
        main: '#43a047',
      },
    },
  });
  const farmBoyOrange = createTheme({
    palette: {
      mode: 'light',
      primary: {
        //
        main: '#ef6c00',
      },
      secondary: {
        main: '#fbc02d',
      },
    },
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
            <Component {...pageProps} />
          </SessionContextProvider>
      </ThemeProvider>
    </Layout>
  });
  // should put theme in theme provider when options are made
  let themeSelector = (theme) => {
    return theme;
  };

  const [theme, setTheme] = React.useState('farmBoyOrange')
  // made a div to easily change colors for now
  return (
    <ThemeProvider theme={farmBoyOrange}>
      <Layout>
        <div>
          <ToggleButtonGroup
            backgroundColor="secondary"
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <p>Choose your theme!!!</p>
            <ToggleButton color="primary" value="purpleDrankKing">
              Purple Drank King
            </ToggleButton>
            <ToggleButton value="farmBoyOrange">Farm Boy Orange</ToggleButton>
            <p> Dark Mode Toggle</p>
            <Switch {...label} defaultChecked />
          </ToggleButtonGroup>
        </div>
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
