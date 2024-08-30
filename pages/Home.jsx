import Header from '../src/components/Header';
import Card from '../src/components/Card';
import Search from '../src/components/Search';
// import { useState } from 'react';

const Home = () => {
  // state for term retrieval
  // const [term, setTerms] = setTerms([]);

  return (
    <div>
      <Header />
      <Search />
      <Card />
    </div>
  );
};

export default Home;
