import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRandomFoodTrivia } from './api/ingApi';

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
      <p>{trivia}</p>
      <Link
        style={{ textDecoration: 'none', color: 'white' }}
        href={'/ingredients-recipes'}
      >
        Add Ingredients
      </Link>
    </>
  );
}

export default Home;
