import { useState } from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const { email, token } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch(`/api/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
    'apikey': SUPABASE_KEY },
      body: JSON.stringify({ email, token, password }),
    });

    if (response.ok) {
      setSuccess(true);
    } else {
      const { error } = await response.json();
      setError(error);
    }
    setLoading(false);
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
        <form onSubmit={handleSubmit}>
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
