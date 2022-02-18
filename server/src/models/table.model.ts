import mongoose from "mongoose";
const { Schema } = mongoose;

const tableSchema = new Schema({
  date: {
    type: String,
    trim: true,
    required: true,
  },
  detail: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Table", tableSchema);
