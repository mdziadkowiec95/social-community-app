import { model, Schema } from 'mongoose';
import { ObjectIdType } from './schema-types';
import { CommunityRole } from './Community.model';

const CommunityInvitationTokenSchema = new Schema({
  userId: { type: ObjectIdType, required: true, ref: 'User' },
  communityId: { type: ObjectIdType, required: true, ref: 'Community' },
  token: { type: String, required: true },
  role: { type: String, enum: Object.keys(CommunityRole), required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 },
});

const CommunityInvitationToken = model('CommunityInvitationToken', CommunityInvitationTokenSchema);

export { CommunityInvitationToken };
