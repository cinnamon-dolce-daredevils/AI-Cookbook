import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link';
import Account from '@/components/Account';
import { Button, Card, Paper } from '@mui/material';
import { Box } from '@mui/system';


const Profile = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  return (
    <Box >
      <Paper elevation={12} >
        <h1 style={{ textAlign: 'center' }}> User Settings</h1>
        <div >
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
          <Link href={'/'}>
            Return Home
          </Link>
        </Button>
      </Paper>
    </Box>
  );
}

export default Profile
