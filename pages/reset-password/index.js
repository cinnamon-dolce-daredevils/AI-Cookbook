import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styles from '../../styles/profile.module.css'
import Link from 'next/link';
import { Button } from '@mui/material';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);


const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be more than 6 characters long");
      return;
    } else {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (data) {
        setError(false);
        setSuccess(true);
      } else {
        setError(true);
      }
    }
  };

  return (
    <div className={styles.passReset}>
      {success ? '' : <h1>Please Enter Your New Password</h1> }
      {success ? (
        <h2 className={styles.pass}>
          Password has been reset successfully. You can now{' '}
          <Link className={styles.link} href="/profile">sign in</Link>.
        </h2>
      ) : (
        <form onSubmit={handleReset} className={styles.paper}>
          <input
            sx={{ color: 'gray'}}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
          sx={{ color: 'white', textDecoration: 'none', margin: '10px' }}
          variant='contained'
          type="submit"
          disabled={loading}>
          {loading ? 'Loading...' : 'Reset Password'}
          </Button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
