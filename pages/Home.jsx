import TermCard from '../src/my_components/TermCard';
import Add from './Add';
import CardContainer from '@/src/my_components/CardContainer';
import SearchBar from '@/src/my_components/SearchBar';

//hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  // state
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]);
  const [search, setSearch] = useState('');
  // used to track which TermCard was clicked for editing
  const [currentId, setCurrentId] = useState(null);

  //useEffect to fetch from db when Home mounts
  useEffect(() => {
    try {
      const fetchTerms = async () => {
        const response = await fetch('http://localhost:3000/terms');
        const json = await response.json();
        //establish starting state
        if (response.ok) {
          setTerms(json);
        } else {
          console.error(response.status);
        }
      };
      fetchTerms();
    } catch (error) {
      console.log(error);
    }
  }, [currentId]);

  //watch changes in search state update
  useEffect(() => {
    setFilteredTerms(
      terms.filter((term) => {
        return term.title.includes(search.toLowerCase());
      })
    );
  }, [search]);

  //HANDLERS

  //delete handler
  const handleDelete = async (term) => {
    const response = await fetch('http://localhost:3000/delete/' + term._id, {
      method: 'DELETE',
    });
    const json = await response.json();
    setTerms((previousTerms) =>
      previousTerms.filter((t) => t._id !== term._id)
    );
    toast({
      description: 'term deleted succesfully!',
      variant: 'destructive',
    });
  };

  //handler for searchbar
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  //toast function
  const { toast } = useToast();

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
            handleDelete={handleDelete}
          />
        </CardContainer>
        {/* render the edit card */}
        {currentId ? (
          <Add
            term={terms.find((t) => t._id === currentId)}
            currentId={currentId}
            setCurrentId={setCurrentId}
          />
        ) : null}
      </main>
    );
  }
  // here, if no singleTerm is found, yet we have a URL parameter. lets user know term doesn't exist
  if (termName && !singleTerm) {
    return (
      <p className='text-center text-xl italic'>
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
            handleDelete={handleDelete}
          />
        ))}
      </CardContainer>
      {/* render the edit card */}
      {currentId ? (
        <Add
          term={terms.find((t) => t._id === currentId)}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
      ) : null}
    </main>
  );
};

export default Home;
