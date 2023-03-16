import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Link href={'/recipes'}>Go to recipes</Link>
      <Link href={'/login'}>Log In</Link>
      <Link href={'/sign-up'}>Sign Up</Link>
    </>
  )
}
