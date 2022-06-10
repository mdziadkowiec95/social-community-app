import { model, Schema } from 'mongoose';
import { User } from '../types/__generated__/resolvers.types';

const userSchema = new Schema<
  User & {
    password: string;
  }
>({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  city: { type: String },
  country: { type: String, required: true },
  avatar: { type: String, default: null },
  communities: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Community',
      },
    ],
    default: [],
  },
});

const User = model('User', userSchema);

export { User };
