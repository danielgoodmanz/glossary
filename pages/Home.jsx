import Header from '../src/my_components/Header';
import MyCard from '../src/my_components/MyCard';
import Add from './Add';

//shadcn imports
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

import { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const Home = () => {
  // state
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [search, setSearch] = useState('');
  // used to track which MyCard was clicked for editing
  const [currentId, setCurrentId] = useState(null);

  const params = useParams();

  //useEffect to fetch from db when Home mounts
  useEffect(() => {
    const fetchTerms = async () => {
      const response = await fetch('http://localhost:3000/terms');
      const json = await response.json();
      //establish starting state
      if (response.ok) {
        setTerms(json);
        //state hasn't rendered yet here so you'd be logging stale state if log(terms)
        console.log(json);
      }
    };
    fetchTerms();
  }, [currentId]);

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
    <main className='border'>
      <Header />
      {/* searchbar */}
      <div id='search'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='begin your search'
            value={search}
            onChange={handleChange}
          />
        </form>
      </div>
      <div id='MyCard-area'>
        {search
          ? filteredTerms.map((term) => {
              return (
                <MyCard
                  key={term._id}
                  term={term}
                  title={term.title}
                  definiton={term.definiton}
                  difficulty={term.difficulty}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  setTerms={setTerms}
                  terms={terms}
                />
              );
            })
          : terms &&
            terms.map((term) => {
              return (
                <MyCard
                  key={term._id}
                  term={term}
                  title={term.title}
                  definiton={term.definiton}
                  difficulty={term.difficulty}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                  setTerms={setTerms}
                  terms={terms}
                />
              );
            })}
      </div>

      <div id='editarea'></div>
      {currentId ? (
        <Add
          term={terms.find((t) => t._id === currentId)}
          currentId={currentId}
          setCurrentId={setCurrentId}
          setTerms={setTerms}
          terms={terms}
        />
      ) : null}
    </main>
  );
};

export default Home;
