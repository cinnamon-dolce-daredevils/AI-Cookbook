import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@supabase/auth-helpers-react';
import ReactMarkdown from "react-markdown";
import styles from "../../styles/index.module.css";
import { Button } from "@mui/material";

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

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <>
      <div className={styles.navButtons}>
        <Button variant='contained' onClick={handlePrevClick} disabled={currentIndex === 0}>
          Prev
        </Button>
        <Button variant='contained' onClick={handleNextClick} disabled={currentIndex === userFavorites.length - 1}>
          Next
        </Button>
      <ul className={styles.recipeMulti}>
        {userFavorites[currentIndex] && (
          <li key={currentIndex} className={styles.recipe}>
            <ReactMarkdown>{userFavorites[currentIndex].selectedRecipe}</ReactMarkdown>
          </li>
        )}
      </ul>
        </div>
    </>
  );
};

export default FavoritesPage;

