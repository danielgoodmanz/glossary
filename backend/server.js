import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  // let's init the DB here so we can set up the retrieval of existing terms, and pull ONE card
  // home route needs an existing array of what terms exist, we will map that to card component
  res.send('hello world');
});

app.post('/add', (req, res) => {
  res.send('hello world');
});

app.put('/edit', (req, res) => {
  res.send('hello world');
});

app.delete('/delete', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => console.log('we are live'));
