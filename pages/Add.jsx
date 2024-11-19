import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../src/my_components/Navbar';

//shadcn imports
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThemeProvider } from '@/components/theme-provider';
import { useToast } from '@/hooks/use-toast';

const Add = ({ term, currentId, setCurrentId, terms, setTerms }) => {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [definition, setDefinition] = useState('');
  const [error, setError] = useState('');

  //hooks
  const { toast } = useToast();
  const navigate = useNavigate();

  function updateTitle(e) {
    setTitle(e.target.value);
  }
  function updateDifficulty(e) {
    setDifficulty(e.target.value);
  }
  function updateDefiniton(e) {
    setDefinition(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentId) {
      // this is the body of the request below sent to the post route
      const term = { title, definition, difficulty };

      //you have to set your method, body & headers for a fetch API post request
      const response = await fetch('http://localhost:3000/add', {
        method: 'POST',
        //you must make the term (JS object) a JSON string
        body: JSON.stringify(term),
        headers: {
          'content-type': 'application/json',
        },
      });

      const json = await response.json();

      console.log(json);

      if (!response.ok) {
        setError(json.error);
        console.log(json.error);
        return;
      }

      if (response.ok) {
        navigate('/');
        toast({
          description: 'new term added succesfully!',
          variant: 'success',
        });
        setDefinition('');
        setTitle('');
        setDifficulty('');
      }
    } else {
      // OUR PUT REQUEST
      const updatedTerm = { title, definition, difficulty };

      const response = await fetch('http://localhost:3000/edit/' + currentId, {
        method: 'PUT',
        body: JSON.stringify(updatedTerm),
        headers: {
          'content-type': 'application/json',
        },
      });

      const json = await response.json();

      setTerms((previousTerms) => {
        return previousTerms.map((term) =>
          term.id === currentId ? updatedTerm : term
        );
      });

      setCurrentId('');
      toast({ description: 'term edited succesfully' });
    }
  };

  return (
    <ThemeProvider>
      <div className='font-bold text-center'>
        {currentId ? null : <Navbar />}
        <div className='flex justify-center text-center'>
          <form action='/add' method='post' onSubmit={handleSubmit}>
            <main className='space-y-2'>
              {currentId ? (
                <h1 className='text-4xl'>editing '{term.title}'</h1>
              ) : (
                <h1 className='text-4xl'>Add a term!</h1>
              )}
              <label htmlFor='name'></label>
              <Input
                type='text'
                name='title'
                placeholder='term title'
                required
                autoFocus
                onChange={updateTitle}
                value={title}
              ></Input>
              <label htmlFor='difficulty'></label>
              <Input
                type='text'
                name='difficulty'
                placeholder='rate it '
                required
                onChange={updateDifficulty}
                value={difficulty}
              ></Input>
              <label htmlFor='definition'></label>
              <Textarea
                name='definiton'
                id='definition'
                rows={5}
                required
                placeholder="what's it mean?"
                onChange={updateDefiniton}
                value={definition}
                spellCheck
                className='resize-none'
              ></Textarea>
            </main>
            <section className='flex justify-around mt-2'>
              <Button>Finish</Button>
              <Button variant='secondary' onClick={() => setCurrentId(null)}>
                Cancel
              </Button>
            </section>
          </form>
        </div>
        {error && <p className='mt-2 italic text-xl'>{error}</p>}
      </div>
    </ThemeProvider>
  );
};

export default Add;
