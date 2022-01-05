import { Schema } from 'mongoose';

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});
