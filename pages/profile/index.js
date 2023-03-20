import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link';
import Account from '@/components/Account';
import styles from '../../styles/signin.module.css'

const Profile = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <>
    <div className={styles.container}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={['google']}/>
        ) : (
          <Account session={session} />
          )}
    </div>
          <Link className={styles.links} href={'/'}>Return Home</Link>
    </>
  );
}

export default Profile
