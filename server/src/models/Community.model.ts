import { model, Schema } from 'mongoose';
import { Community } from '../types/__generated__/resolvers.types';

const DateType = Schema.Types.Date as unknown as typeof String;

const communitySchema = new Schema<Community>(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

const Community = model('Community', communitySchema);

export { Community };
