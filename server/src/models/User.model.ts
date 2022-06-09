import { model, Schema } from 'mongoose';
import { UserSchema } from '../types/user.types';

const userSchema = new Schema<UserSchema>({
  firstName: { type: String, required: true },
});

const User = model('User', userSchema);

export { User };
