import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import React, { useState } from 'react'
import { SWRConfig } from "swr";
// below are roboto fonts from google
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from '@/components/Layout';
//imports theme
import { ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
// should only be used for TS. awaiting import { createEmotionCache } from '../src/createEmotionCache';
//the below line replaces the above line

import { lightMode, darkMode } from '../styles/themes'

// line below allows us to use the isLightMode and setIsLightMode
// in other files
export const Context = React.createContext();

function App({ Component, pageProps: { session, ...pageProps } }) {
  let themeSetter = darkMode;
  let [mode, setMode] = useState('darkMode');
  let [isLightMode, setIsLightMode] = useState(false);
  const [supabase] = useState(() => createBrowserSupabaseClient());
  if (isLightMode == true) {
    themeSetter = lightMode;
  } else {
    themeSetter = darkMode;
  }
  return (
		<SessionContextProvider
		supabaseClient={supabase}
		initialSession={pageProps.initialSession}
		>
		<Context.Provider value={[isLightMode, setIsLightMode]}>
			<ThemeProvider theme={themeSetter}>
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
    </SessionContextProvider>
	);
}
export default App;
