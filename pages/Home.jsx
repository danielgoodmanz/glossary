import TermCard from '../src/my_components/TermCard';
import Add from './Add';
import CardContainer from '@/src/my_components/CardContainer';
import SearchBar from '@/src/my_components/SearchBar';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Home = () => {
  // state
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [search, setSearch] = useState('');
  // used to track which TermCard was clicked for editing
  const [currentId, setCurrentId] = useState(null);

  //useEffect to fetch from db when Home mounts
  useEffect(() => {
    const fetchTerms = async () => {
      const response = await fetch('http://localhost:3000/terms');
      const json = await response.json();
      //establish starting state
      if (response.ok) {
        setTerms(json);
        //state hasn't rendered yet here so you'd be logging stale state if log(terms)
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

  //handler for searchbar
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //react router URL parameters used to retrieve singular matched term
  const { termName } = useParams();
  const singleTerm = terms.find((t) => t.title === termName);

  //refactoring to early return for readability, instead of triple ternary
  //here we check if a singleTerm was retrieved from terms.find() - if so, return that TermCard
  if (singleTerm) {
    return (
      <main>
        <SearchBar search={search} onChange={handleChange} />
        <CardContainer>
          <TermCard
            key={singleTerm._id}
            term={singleTerm}
            title={singleTerm.title}
            definiton={singleTerm.definiton}
            difficulty={singleTerm.difficulty}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setTerms={setTerms}
            terms={terms}
          />
        </CardContainer>
        {/* render the edit card */}
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
  }
  // here, if no singleTerm is found, yet we have a URL parameter. lets user know term doesn't exist
  if (termName && !singleTerm) {
    return (
      <p className='text-center'>
        Sorry, this term doesn't exist in our database.
      </p>
    );
  }
  //the full term list or filteredTerms (based on client side search) will be returned as TermCards
  //should there not be any parameters at all in the URL
  const displayedTerms = search ? filteredTerms : terms;
  return (
    <main>
      <SearchBar search={search} onChange={handleChange} />
      <CardContainer>
        {displayedTerms.map((term) => (
          <TermCard
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
        ))}
      </CardContainer>
      {/* render the edit card */}
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
