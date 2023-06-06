import Link from 'next/link';

export default function Home() {
   return (
      <main className='flex flex-col gap-4 items-center justify-center min-h-screen'>
         <h4 className='bg-gradient-to-b from-cyan-500 to-blue-500 p-2 rounded-lg shadow animate-pulse'>
            Landing page for client site
         </h4>

         <Link href='/admin'>
            <button className='btn btn-outline btn-primary'>Admin Panel</button>
         </Link>
      </main>
   );
}
