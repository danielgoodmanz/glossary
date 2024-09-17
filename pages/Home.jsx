import Header from '../src/components/Header';
import Card from '../src/components/Card';
import { useState, useEffect } from 'react';

const Home = () => {
  // state
  const [terms, setTerms] = useState([]);

  //useEffect to fetch from db when Home mounts
  useEffect(() => {
    const fetchTerms = async () => {
      const response = await fetch('http://localhost:3000/terms');
      const json = await response.json();
      //establish starting state
      if (response.ok) {
        setTerms(json);
        console.log(terms);
      }
    };
    fetchTerms();
  }, []);

  return (
    <div>
      <Header />
      <div className="card-area">
        {terms &&
          terms.map((term) => {
            return (
              <Card
                key={term._id}
                term={term}
                title={term.title}
                definiton={term.definiton}
                difficulty={term.difficulty}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Home;
