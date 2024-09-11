import React, { useState } from 'react';
import Navbar from '../src/components/navbar';

const Add = () => {
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [definiton, setDefinition] = useState('');

  function updateTitle(e) {
    setTitle(e.target.value);
  }
  function updateDifficulty(e) {
    setDifficulty(e.target.value);
  }
  function updateDefiniton(e) {
    setDefinition(e.target.value);
  }

  function handleSubmit() {}

  return (
    <div>
      <Navbar />
      <form action='/add' method='post' onSubmit={handleSubmit}>
        <section>
          <h1>Add a term!</h1>
          <p>
            <label htmlFor='name'></label>
            <input
              type='text'
              name='title'
              placeholder='term title'
              required
              onChange={updateTitle}
            />
          </p>
          <p>
            <label htmlFor='difficulty'></label>
            <input
              type='text'
              name='difficulty'
              placeholder='rate it '
              required
              onChange={updateDifficulty}
            />
          </p>
          <p>
            <label htmlFor='definition'></label>
            <textarea
              name='definiton'
              id='definition'
              rows={3}
              required
              placeholder="what's it mean?"
              onChange={updateDefiniton}
            />
          </p>
        </section>
        <section>
          <button type='submit'>Finish</button>
        </section>
      </form>
    </div>
  );
};

export default Add;
