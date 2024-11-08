import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Custom404(){
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Umm... I thing you are lost </p>
      <Link href="/dashboard">
        <Button variant="outline" className="bg-yellow-200 text-blue-600 border-2 border-fuchsia-500 hover:bg-fuchsia-300 text-sm md:text-base px-2 md:px-4 py-1 md:py-2">Go back Home</Button>
      </Link>
    </div>
  );
};

export default Custom404;
