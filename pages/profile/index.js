import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Account from '@/components/Account';
import { Button, Paper } from '@mui/material';
import { Box } from '@mui/system';
import styles from '../../styles/profile.module.css';

const Profile = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <Box className={styles.box}>
      <Paper className={styles.paper} elevation={12}>
        <h1 style={{ textAlign: 'center' }}> User Settings</h1>
        <div>
          {!session ? (
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
              providers={['google']}
            />
          ) : (
            <Account session={session} />
          )}
        </div>
        <Button href={'/'} sx={{ textDecoration: 'none', margin: '10px', position: 'relative', right: '50px'}} variant="contained">
          Return Home
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
