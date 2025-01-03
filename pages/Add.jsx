import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/my-components/Navbar';

//shadcn imports
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

const Add = ({ term, currentId, setCurrentId, setTerms }) => {
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

    try {
      //deconstructing the term inputs
      const submission = { title, definition, difficulty };

      // the fetch
      const endpoint = `http://localhost:3000/${currentId ? `edit/${currentId}` : `add`}`;
      const method = currentId ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        body: JSON.stringify(submission),
        headers: { 'content-type': 'application/json' },
      });

      const json = await response.json();

      if (response.ok && !currentId) {
        navigate('/');
        toast({
          description: 'new term added succesfully!',
          variant: 'success',
        });
        setDefinition('');
        setTitle('');
        setDifficulty('');
      } else if (response.ok && currentId) {
        setTerms((previousTerms) => {
          return previousTerms.map((term) =>
            term.id === currentId ? submission : term
          );
        });

        setCurrentId('');
        toast({ description: 'term edited succesfully' });
      }

      if (!response.ok) {
        setError(json.error);
        toast({ description: json.error, variant: 'destructive' });
      }
    } catch (error) {
      setError(error);
      console.log(error);
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
              <Button
                variant='secondary'
                onClick={
                  currentId ? () => setCurrentId(null) : () => navigate('/')
                }
              >
                Cancel
              </Button>
            </section>
          </form>
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default Add;
