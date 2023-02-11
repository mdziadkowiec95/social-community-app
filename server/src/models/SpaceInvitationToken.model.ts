import { model, Schema } from 'mongoose';
import { ObjectIdType } from './schema-types';
import { CommunityRole } from './Space.model';

const SpaceInvitationTokenSchema = new Schema({
  userId: { type: ObjectIdType, required: true, ref: 'User' },
  communityId: { type: ObjectIdType, required: true, ref: 'Space' },
  token: { type: String, required: true },
  // @TODO Change to handle permissions
  role: { type: String, enum: Object.keys(CommunityRole), required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

const SpaceInvitationToken = model('SpaceInvitationToken', SpaceInvitationTokenSchema);

export { SpaceInvitationToken };
