import Header from '../src/components/Header';
import Card from '../src/components/Card';
import Search from '../src/components/Search';
import { useState, useEffect } from 'react';

const Home = () => {
  // state
  const [term, setTerms] = useState([]);
  //useEffect to fetch from db when Home mounts
  useEffect(() => {
    const fetchTerms = async () => {
      const response = await fetch('http://localhost:3000/terms');
      const json = await response.json();
      console.log(json);

      //establish starting state
      if (response.ok) {
        setTerms(json);
      }
    };
    fetchTerms();
  }, []);

  return (
    <div>
      <Header />
      <Search />
      <div className='glossaryterms'>
        {term &&
          term.map((term) => {
            return (
              <Card
                key={term._id}
                title={term.title}
                definition={term.definition}
                difficulty={term.difficulty}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
