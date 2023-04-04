import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from '@supabase/auth-helpers-react';
import ReactMarkdown from "react-markdown";
import styles from "../../styles/index.module.css";
import { Button } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useMute } from "@/components/MuteContext";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const metadata = {
	title: 'Favorites',
	description: 'Displays a list of users\' favorite recipes!'
};

const FavoritesPage = (userId) => {
  const [userFavorites, setUserFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(true);
  const { isMuted } = useMute();
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

  function playAudio(audioPath) {
    const audio = new Audio(audioPath);
    audio.play();
  }

  const addToFavorites = async (selectedRecipe, userId) => {
		try {
			const { data, error } = await supabase
				.from("favorites")
				.insert([{ selectedRecipe, userId }]);
			if (error) throw error;
		} catch (error) {
			console.error("Error inserting into favorites:", error.message);
		}
	};

  const toggleFavorite = async (selectedRecipe) => {
		try {
			if (isFavorite) {
        if (!isMuted) {
        playAudio('/audio/Short.m4a');}
        const { data, error } = await supabase
        .from("favorites")
        .delete()
        .match({ selectedRecipe, userId });
				if (error) throw error;
			} else {
				await addToFavorites(selectedRecipe, userId);
        if (!isMuted) {
          playAudio('/audio/New Recording.m4a');}
			}
			setIsFavorite(!isFavorite);

		} catch (error) {
			console.error("Error toggling favorite:", error.message);
		}
	};

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
        <Button
          sx={{ color: 'white' }}
          variant="contained"
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
        >
          Prev
        </Button>
        <Button
          sx={{ color: 'white' }}
          variant="contained"
          onClick={handleNextClick}
          disabled={currentIndex === userFavorites.length - 1 || userFavorites.length === 0}
        >
          Next
        </Button>
        <ul className={styles.recipeMulti}>
          {userFavorites[currentIndex] && (
            <li key={currentIndex} className={styles.recipe}>
              {!isFavorite && <p>Recipe removed from Favorites</p>}
              <FavoriteIcon
                className={styles.favorite}
                style={{
                  fontSize: '50px',
                  width: '50px',
                  color: isFavorite ? 'red' : 'grey',
                }}
                onClick={() => {
                  toggleFavorite(userFavorites[currentIndex].selectedRecipe);
                }}
              />
              <ReactMarkdown>
                {userFavorites[currentIndex].selectedRecipe}
              </ReactMarkdown>
            </li>
          )}
        </ul>
      </div>

    </>
  );
};

export default FavoritesPage;

