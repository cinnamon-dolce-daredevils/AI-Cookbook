import { useState } from 'react';
import { useRouter } from 'next/router';
import bcrypt from 'bcryptjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import Link from 'next/link';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = useSupabaseClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = router.query.token;
    const email = router.query.email;
    if (!token || !email) {
      setError('Invalid password reset token or email.');
      setLoading(false);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Submitting reset password form...', { email, token, newPassword: hashedPassword });

    const response = await fetch(`/api/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, newPassword: hashedPassword }),
    });

    console.log('Reset password API response:', response);

    if (response.ok) {
      await supabase.auth.signOut();
      setSuccess(true);
      const { user } = await response.json();
      console.log('Password update successful:', user);
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

