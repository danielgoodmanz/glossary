import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../src/components/Navbar';

const Add = ({ term, currentId, setCurrentId, terms, setTerms }) => {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [definition, setDefinition] = useState('');

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
    if (!currentId) {
      e.preventDefault();
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
      navigate('/');
      const json = await response.json();
      setDefinition('');
      setTitle('');
      setDifficulty('');
      console.log('new term added', json);
    } else {
      // OUR PUT REQUEST
      e.preventDefault();

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
    }
  };

  return (
    <div>
      <Navbar />
      <form action="/add" method="post" onSubmit={handleSubmit}>
        <section>
          {currentId ? (
            <h1 className="font-bold text-4xl">editing '{term.title}'</h1>
          ) : (
            <h1 className="font-bold text-4xl">Add a term!</h1>
          )}
          <p>
            <label htmlFor="name"></label>
            <input
              type="text"
              name="title"
              placeholder="term title"
              required
              onChange={updateTitle}
              value={title}
            />
          </p>
          <p>
            <label htmlFor="difficulty"></label>
            <input
              type="text"
              name="difficulty"
              placeholder="rate it "
              required
              onChange={updateDifficulty}
              value={difficulty}
            />
          </p>
          <p>
            <label htmlFor="definition"></label>
            <textarea
              name="definiton"
              id="definition"
              rows={3}
              required
              placeholder="what's it mean?"
              onChange={updateDefiniton}
              value={definition}
            />
          </p>
        </section>
        <section className="flex gap-2">
          <button>Finish</button>
          <button onClick={() => setCurrentId(null)}>Cancel</button>
        </section>
      </form>
    </div>
  );
};

export default Add;
