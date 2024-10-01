import Header from '../src/components/Header';
import Card from '../src/components/Card';
import Add from './Add';

import { useState, useEffect } from 'react';

const Home = () => {
  // state
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [search, setSearch] = useState('');
  // used to track which card was clicked for editing
  const [currentId, setCurrentId] = useState(null);

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

  //watch changes in search state update
  useEffect(() => {
    setFilteredTerms(
      terms.filter((term) => {
        return term.title.includes(search.toLowerCase());
      })
    );
  }, [search]);

  //handlers
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Header />
      {/* searchbar */}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="begin your search"
            value={search}
            onChange={handleChange}
          />
          {/* <button>go</button> */}
        </form>
      </div>
      <div className="card-area">
        {search
          ? filteredTerms.map((term) => {
              return (
                <Card
                  key={term._id}
                  term={term}
                  title={term.title}
                  definiton={term.definiton}
                  difficulty={term.difficulty}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
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
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              );
            })}
      </div>
      <hr />
      <hr />
      <div className="editarea"></div>
      {/* {currentId ? (
        <Card term={terms.find((t) => t._id === currentId)} />
      ) : null} */}
      {currentId ? (
        <Add
          term={terms.find((t) => t._id === currentId)}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
      ) : null}
    </div>
  );
};

export default Home;
