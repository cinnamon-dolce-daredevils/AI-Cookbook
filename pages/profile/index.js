import { Auth } from '@supabase/auth-ui-react';
import { useContext, useEffect } from 'react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';
import { Button, Paper } from '@mui/material';
import { Box } from '@mui/system';
import styles from '../../styles/profile.module.css';
import { Context } from '../../pages/_app';

const Profile = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  let [isLightMode] = useContext(Context);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      router.push(`/reset-password?token=${token}`);
    }
  }, []);


  return (
    <Box className={styles.box}>
      <Paper
        sx={{ color: isLightMode ? 'black' : 'white'}}
        className={styles.paper}
        elevation={12}
      >
        <h1 style={{ textAlign: 'center', color: isLightMode ? 'black' : 'white' }}> User Settings</h1>
        <div style={{color: isLightMode ? 'black' : 'white'}}>
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa, color: isLightMode ? 'black' : 'white' }}
              theme={isLightMode ? 'light' : 'dark'}
              providers={['google']}
            />
          ) : (
            <Account session={session} />
          )}
        </div>
        <Button
          href={'/'}
          sx={{ color: 'white', textDecoration: 'none', margin: '10px' }}
          variant="contained"
        >
          Return Home
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
