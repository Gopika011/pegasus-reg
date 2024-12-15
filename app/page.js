"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/register');
  }, [router]);

  return (
    <div className="h-screen w-full justify-center bg-black items-center flex">

    </div>
  );
}
