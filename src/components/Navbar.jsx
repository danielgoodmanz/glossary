import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <Link to='/'>
        <h1>gloss home</h1>
      </Link>
      <Link to='/add'>
        <h1>contribute</h1>
      </Link>
    </div>
  );
};

export default Navbar;
