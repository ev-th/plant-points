import Link from 'next/link';
import { auth } from '@clerk/nextjs';

const Home = () => {
  const { userId } = auth()
  const href = userId ? '/diary' : '/new-user'

  return (
    <div className='flex justify-center items-center w-screen h-screen'>
      <div className='max-w-4xl'>
        <h1 role="heading" className='text-8xl mb-4'>Plant Points Tracker</h1>
        <p role="region" className='text-2xl mb-12'>Keep track of the variety of plant based foods you eat. Each ingredient is worth a point. Aim for 30 per week.</p>
        <Link role="link" className='bg-green-300 rounded-md px-4 py-2 text-lg' href={href}>Get started</Link>
      </div>
    </div>
  )
}

export default Home