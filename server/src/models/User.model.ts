import { model, Schema } from 'mongoose';

export type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  city?: string;
  country: string;
  avatar?: string;
};

const userSchema = new Schema<User>(
  {
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
    dateOfBirth: { type: Date, required: true },
    city: { type: String, default: null },
    country: { type: String, required: true },
    avatar: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

const UserModel = model('User', userSchema);

export { UserModel };
