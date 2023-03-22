import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link';
import Account from '@/components/Account';
import styles from '../../styles/signin.module.css'
import { Button, Card, Paper } from '@mui/material';


const Profile = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  return (
    <Paper className={styles.container}>
      <h1 style={{ textAlign: 'center' }}> User Settings</h1>
      <div className={styles.container}>
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
      <Button variant="contained">
        <Link className={styles.links} href={'/'}>
          Return Home
        </Link>
      </Button>
    </Paper>
  );
}

export default Profile
