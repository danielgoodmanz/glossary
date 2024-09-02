import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Term from '../backend/models/glossaryModel.js';

dotenv.config();

const app = express();

//middleware
app.use(express.json());

//env variables
const port = process.env.BACKEND_PORT;
const dburi = process.env.MONGO_URI;

//connect db
const db = async () => {
  try {
    const response = await mongoose.connect(dburi);
  } catch (err) {
    console.log(err);
  }
};

db();

//routes
app.get('/', async (req, res) => {
  const terms = await Term.find({});
  res.send(terms[1].title);
  // let's init the DB here so we can set up the retrieval of existing terms, and pull ONE card
  // home route needs an existing array of what terms exist, we will map that to card component
});

app.post('/', async (req, res) => {
  const { title, definition, difficulty } = req.body;
  const term = await Term.create({ title, definition, difficulty });
  res.status(200).json(term);
});

app.put('/edit', (req, res) => {
  res.send('hello world');
});

app.delete('/delete', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => console.log('we are live'));
