import { model, Schema } from 'mongoose';
import { ObjectIdType } from './schema-types';
import { SpaceMember } from './SpaceMember.model';

export enum CommunityRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum SpaceType {
  // Everyone can see but need to send a join request
  NON_PUBLIC = 'NON_PUBLIC',
  // Everyone can see and join
  PUBLIC = 'PUBLIC',
  // Only visible for members and invited people
  PRIVATE = 'PRIVATE',
}

export type Space = {
  name: string;
  description: string;
  type: SpaceType | null;
  createdBy: string;
  members: (string | SpaceMember)[];
  keywords: string[];
};

const spaceSchema = new Schema<Space>(
  {
    name: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: Object.values(SpaceType),
      default: null,
      required: true,
    },
    createdBy: { type: ObjectIdType, ref: 'User', required: true },
    members: [{ type: ObjectIdType, ref: 'SpaceMember' }],
    keywords: [String],
  },
  {
    timestamps: true,
  },
);

const SpaceModel = model('Space', spaceSchema);

export { SpaceModel };
