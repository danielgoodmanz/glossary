import mongoose from 'mongoose';

//structure of model
const glossarySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    definition: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: false,
      cast: 'rating must be a number',
    },
  },
  { timestamps: true }
);

const Term = mongoose.model('Term', glossarySchema);

//model to use db methods on
export default Term;
