import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

import Link from 'next/link';

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
    <div>
      <h1>Reset Password</h1>
      {success ? (
        <p>
          Password has been reset successfully. You can now{' '}
          <Link href="/profile">sign in</Link>.
        </p>
      ) : (
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Reset Password'}
          </button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
