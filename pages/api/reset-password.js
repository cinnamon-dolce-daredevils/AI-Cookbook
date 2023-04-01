import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email, token, password } = req.body;

    try {
      const { user, error } = await supabase.auth.updateUser(token,{
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).end();
  }
};
