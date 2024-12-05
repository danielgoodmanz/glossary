import TermCard from '@/components/my-components/TermCard';
import Add from '@/pages/Add';
import CardContainer from '@/components/my-components/CardContainer';
import SearchBar from '@/components/my-components/SearchBar';

//types
export type Term = {
  _id: string;
  title: string;
  definition: string;
  difficulty: string;
};

export type TermCardProps = {
  term: Term;
  currentId: string;
  setCurrentId: React.Dispatch<React.SetStateAction<string>>;
  handleDelete: (term: Term) => Promise<void>;
  handleEdit: (term: Term) => void;
};

//hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  // state
  const [terms, setTerms] = useState<Term[]>([]);
  const [filteredTerms, setFilteredTerms] = useState<Term[]>([]);
  const [search, setSearch] = useState<string>('');
  // used to track which TermCard was clicked for editing
  const [currentId, setCurrentId] = useState<string>('');

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

  //add & edit handlers for form submission are in the Add.jsx form component
  //as it needs its own local state to operate, cannot drill to it as it's rendered
  //as a solo-component in its own route

  //delete handler
  const handleDelete = async (term: Term) => {
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

  //edit handler
  const handleEdit = (term: Term) => {
    // future implementation could make the input fields editable
    setCurrentId(term._id);
  };

  //handler for searchbar
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            currentId={currentId}
            setCurrentId={setCurrentId}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </CardContainer>
        {/* render the edit card */}
        {currentId ? (
          <Add
            term={terms.find((t) => t._id === currentId)!}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setTerms={setTerms}
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
            currentId={currentId}
            setCurrentId={setCurrentId}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </CardContainer>
      {/* render the edit card */}
      {currentId ? (
        <Add
          term={terms.find((t) => t._id === currentId)!}
          currentId={currentId}
          setCurrentId={setCurrentId}
          setTerms={setTerms}
        />
      ) : null}
    </main>
  );
};

export default Home;
