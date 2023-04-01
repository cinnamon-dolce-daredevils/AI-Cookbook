import { useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    console.log('Submitting reset password form...', { email, token, password });

    const response = await fetch('/api/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, password }),
    });

    console.log('Reset password API response:', response);

    if (response.ok) {
      setSuccess(true);
      console.log('Password reset successful:', email);
    } else {
      const { error } = await response.json();
      setError(error);
      console.error('Reset password API error:', error);
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
