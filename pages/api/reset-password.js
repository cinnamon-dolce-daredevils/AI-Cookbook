import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, token, password } = req.body;

    try {
      const { error } = await supabase.auth.updateUser(email, token, {
        password: password,
      });

      console.log('Password update successful:', email, token, password);
      res.status(200).json({ success: true, user: email });
    } catch (error) {
      console.log('Password update failed:', error);
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
};
