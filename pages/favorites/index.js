import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@supabase/auth-helpers-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const FavoritesPage = (userId) => {
  const [userFavorites, setUserFavorites] = useState([]);
  const session = useSession();
  if(session){
    userId = session.user.id
  }
  useEffect(() => {
    const fetchFavorites = async () => {
      const { data: favorites, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('userId', userId);
      if (error) {
        console.error(error);
      } else {
        setUserFavorites(favorites);
      }
    };
    fetchFavorites(userId);
  }, [userId]);


 return (
    <ul>
      {userFavorites.map((favorite, idx) => (
        <div key={idx}>{favorite.selectedRecipe}</div>
      ))}
    </ul>
  );
};

export default FavoritesPage;

