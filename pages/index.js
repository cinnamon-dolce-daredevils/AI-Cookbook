import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRandomFoodTrivia } from './api/ingApi';
import styles from '../styles/index.module.css';
import { useSession } from '@supabase/auth-helpers-react';
import { useTheme } from '@emotion/react';
import { Button } from '@mui/material';

const Home = () => {
  const theme = useTheme();
  const [trivia, setTrivia] = useState("");
  const session = useSession();

  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const trivia = await getRandomFoodTrivia();
        setTrivia(trivia);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };
  
    fetchTrivia();
  }, []);
  

  return (
    <>
      <div className={styles.container}>
        <img src="/images/AICB_LogG.png" className={styles.icon} />
        <p className={styles.trivia}>{trivia}</p>
        {session ? (
          <Link
            className={styles.link}
            style={{ textDecoration: 'none', color: 'white' }}
            href={'/ingredients-recipes'}
          >
            Add Ingredients
          </Link>
        ) : (
          <Button>
            <Link
              className={styles.link}
              style={{
                backgroundColor: theme.palette.primary.main,
                textDecoration: 'none',
                color: 'white',
              }}
              href={'/profile'}
            >
              {' '}
              Signup/Login
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}

export default Home;
