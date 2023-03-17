import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link';
import Account from '@/components/Account';

const Profile = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <>
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="dark" providers={['google']}/>
      ) : (
        <Account session={session} />
      )}
    </div>
    </>
  );
}

export default Profile
