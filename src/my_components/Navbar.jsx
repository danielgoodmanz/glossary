import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex gap-4 justify-center'>
      <Link to='/'>
        <h1>home</h1>
      </Link>
      <Link to='/add'>
        <h1>contribute</h1>
      </Link>
    </div>
  );
};

export default Navbar;
