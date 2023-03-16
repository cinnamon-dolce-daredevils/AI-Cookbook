import { SessionProvider } from 'next-auth/react';
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
function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <SessionProvider session={session} refetchInterval={5 * 60}>
            <Component {...pageProps} />
          </SessionProvider>
      </ThemeProvider>
    </Layout>
  );
}

export default App;
