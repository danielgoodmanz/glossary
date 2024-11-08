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

  //handlers for searchbar
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //react router URL parameters used to retrieve singular matched term
  const { termName } = useParams();
  const singleTerm = terms.find((t) => t.title === termName);

  return (
    <main>
      {/* searchbar */}
      <SearchBar search={search} onChange={handleChange} />
      <CardContainer>
        {/* went with a 'views' approach where we have
              a check for single term existing, if so, render that TermCard
              if no parameter then render all OR search query*/}
        {termName ? (
          // Single-term view: Render only the `singleTerm` if found
          singleTerm ? (
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
          ) : (
            // Fallback message if term not found
            <p className='text-center'>
              sorry! this term is not in our database
            </p>
          )
        ) : (
          // Default view: Render all terms or filtered terms based on search
          (search ? filteredTerms : terms).map((term) => (
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
          ))
        )}
      </CardContainer>
      {currentId ? (
        <Add
          term={terms.find((t) => t._id === currentId)}
          currentId={currentId}
          setCurrentId={setCurrentId}
          setTerms={setTerms}
          terms={terms}
        />
      ) : null}
      {/* abandoning use of Outlet, not good for stateful components (unless using Context API)
      <Outlet /> */}
    </main>
  );
};

export default Home;
