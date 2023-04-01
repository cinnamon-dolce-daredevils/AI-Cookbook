import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  headers: {
    'apiKey': supabaseServiceKey
  }
})

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, token, newPassword } = req.body;

    try {
      const { error } = await supabase.auth.updateUser(email, token, {
        password: newPassword,
      });

      console.log('Password update successful:', email, token);
      res.status(200).json({ success: true, user: email });
    } catch (error) {
      console.log('Password update failed:', error);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
