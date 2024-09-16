import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import Term from '../backend/models/glossaryModel.js';
// import dns from 'node:dns';

// dns.setDefaultResultOrder('ipv4first');

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//env variables
const port = process.env.BACKEND_PORT;
const dburi = process.env.MONGO_URI;

//connect db
const db = async () => {
  try {
    await mongoose.connect(dburi);
  } catch (err) {
    console.log(err);
  }
};

db();

//routes

app.get('/', (req, res) => {
  res.send('welcome');
});

app.get('/terms', async (req, res) => {
  const terms = await Term.find({});
  res.send(terms);
});

app.get('/findone', async (req, res) => {
  console.log(req.params);
  const terms = await Terms.find();
  res.send(terms);
});

app.post('/add', async (req, res) => {
  const { title, definition, difficulty } = req.body;
  const term = await Term.create({ title, definition, difficulty });
  res.status(200).json(term);
});

app.put('/edit/:id', async (req, res) => {
  //get id of request
  const { id } = req.params;

  const term = await Term.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(200).json(term);
});

app.delete('/delete/:id', async (req, res) => {
  //get id of request
  const { id } = req.params;

  const term = await Term.findOneAndDelete({ _id: id });

  res.status(200).json(term);
});

app.listen(port, () => console.log('we are live'));
