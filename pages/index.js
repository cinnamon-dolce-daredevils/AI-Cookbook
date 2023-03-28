import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRandomFoodTrivia } from './api/ingApi';
import styles from '../styles/index.module.css';
import { useSession } from '@supabase/auth-helpers-react';
import { useTheme } from '@emotion/react';
import { Button, Container, Typography } from '@mui/material';

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
        <Container sx={{backgroundColor: theme.palette.primary.main}}>
          <Typography>
            {trivia}
          </Typography>
        </Container>
        {session ? (
          <Link
            style={{ textDecoration: 'none', color: 'white' }}
            href={'/ingredients-recipes'}
          >
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.common.white,
              }}
            >
              Add Ingredients
            </Button>
          </Link>
        ) : (
          <Link style={{ textDecoration: 'none' }} href={'/profile'}>
            <Button
              sx={{
                color: 'white',
                backgroundColor: theme.palette.secondary.main,
                textDecoration: 'none',
              }}
              variant="contained"
            >
              {' '}
              Signup/Login
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}

export default Home;
