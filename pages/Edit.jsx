const Edit = () => {
  return (
    <div>
      <form action='/edit/:id' method='post'>
        <section>
          <h1></h1>
          <p>
            <label htmlFor='name'></label>
            <input
              type='text'
              name='title'
              placeholder='term title'
              required
              onChange
              value
            />
          </p>
          <p>
            <label htmlFor='difficulty'></label>
            <input
              type='text'
              name='difficulty'
              placeholder='rate it '
              required
              onChange
              value
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
              onChange
              value
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

export default Edit;
