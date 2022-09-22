import { model, Schema } from 'mongoose';
import { ObjectIdType } from './schema-types';

export enum CommunityRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

const communitySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: ObjectIdType, ref: 'User', required: true },
    members: {
      type: [
        {
          user: { type: ObjectIdType, ref: 'User', required: true },
          role: { type: String, enum: Object.keys(CommunityRole), required: true },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Community = model('Community', communitySchema);

export { Community };
