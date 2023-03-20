import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Link
        style={{ textDecoration: 'none', color: 'white' }}
        href={'/ingredients-recipes'}
      >
        Add Ingredients
      </Link>
    </>
  );
}

export default Home

