import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Link href={'/ingredients-recipes'}>Add Ingredients</Link>
      <Link href={'/profile'}>Profile</Link>
    </>
  );
}

export default Home

