import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Avatar from './Avatar';
import {
  Button,
  FormControl,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, avatar_url }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <FormControl>
      <label> Account Email</label>
      <TextField id="email" type="text" value={session.user.email} disabled />
      <br />
      <br></br>
      <label htmlFor="username">Update Username</label>
      <Input
        sx={{ color: 'gray'}}
        label="goal description"
        id="username"
        type="text"
        value={username || ''}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div>
        <Button
          variant="contained"
          onClick={() => updateProfile({ username, avatar_url })}
          disabled={loading}
          sx={{ color: 'white', mt:1, }}
        >
          {loading ? 'Loading ...' : 'SUBMIT'}
        </Button>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          left: '30px',
        }}
      >
        <Typography
          sx={{ textAlign: 'center', position: 'relative', right: '29px' }}
          variant="h6"
        >
          {' '}
          Upload or Change Profile Picture
        </Typography>
        <Button
          variant="outlined"
          sx={{ color: 'white', position: 'relative', right: '29px' }}
        >
          <Avatar
            styles={{ backgroundColor: 'white' }}
            uid={user.id}
            url={avatar_url}
            size={250}
            onUpload={(url) => {
              setAvatarUrl(url);
              updateProfile({ username, avatar_url: url });
            }}
          />
        </Button>
      </Box>
      <br></br>
      <Button
        color="error"
        variant="outlined"
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </Button>
    </FormControl>
  );
}
