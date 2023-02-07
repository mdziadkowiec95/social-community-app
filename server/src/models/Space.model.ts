import { model, Schema } from 'mongoose';
import { ObjectIdType } from './schema-types';

export enum CommunityRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

const spaceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    createdBy: { type: ObjectIdType, ref: 'User', required: true },
    members: [{ type: ObjectIdType, ref: 'SpaceMember' }],
  },
  {
    timestamps: true,
  },
);

const Space = model('Space', spaceSchema);

export { Space };
