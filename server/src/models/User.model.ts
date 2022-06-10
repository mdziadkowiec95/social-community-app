import { model, Schema } from 'mongoose';
import { User } from '../types/__generated__/resolvers.types';

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  city: { type: String },
  country: { type: String, required: true },
});

const User = model('User', userSchema);

export { User };
