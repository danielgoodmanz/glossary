import { Button } from '@/components/ui/button';
import { MoonStar } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex gap-4 justify-between font-bold'>
      <Link className='' to='/'>
        <h1>home</h1>
      </Link>
      <Link to='/add'>
        <h1>contribute</h1>
      </Link>
      <Button className='h-6 w-6' variant='ghost' size='icon'>
        <MoonStar></MoonStar>
      </Button>
    </div>
  );
};

export default Navbar;
