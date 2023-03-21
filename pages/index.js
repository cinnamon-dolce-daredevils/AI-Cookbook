import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRandomFoodTrivia } from './api/ingApi';
import styles from '../styles/index.module.css';

const Home = () => {
  const [trivia, setTrivia] = useState("");

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
      <Link className={styles.link}
        style={{ textDecoration: 'none', color: 'white' }}
        href={'/ingredients-recipes'}
      >
        Add Ingredients
      </Link>
      </div>
    </>
  );
}

export default Home;
