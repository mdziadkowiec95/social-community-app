import { model, Schema } from 'mongoose';

const userSchema = new Schema(
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
    city: { type: String },
    country: { type: String, required: true },
    avatar: { type: String, default: null },
  },
  {
    timestamps: true,
  },
);

const UserModel = model('User', userSchema);

export { UserModel };
