import Header from '../src/components/Header';
import Card from '../src/components/Card';
import { useState, useEffect } from 'react';

const Home = () => {
  // state
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [search, setSearch] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
    //onChange is one character behind, look into this **
    setFilteredTerms(
      terms.filter((term) => {
        return term.title.includes(search.toLowerCase());
      })
    );
  };

  return (
    <div>
      <Header />
      {/* searchbar */}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='begin your search'
            value={search}
            onChange={handleChange}
          />
          {/* <button>go</button> */}
        </form>
      </div>
      <div className='card-area'>
        {search
          ? filteredTerms.map((term) => {
              return (
                <Card
                  key={term._id}
                  term={term}
                  title={term.title}
                  definiton={term.definiton}
                  difficulty={term.difficulty}
                />
              );
            })
          : terms &&
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
