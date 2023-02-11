import { model, Schema } from 'mongoose';
import { ObjectIdType } from './schema-types';

export type SpaceMember = {
  user: string;
  spaceId: string;
  permissions: SpacePermissions[];
};

// Keep permissions here
export enum SpacePermissions {
  MEMBER_ADD = 'MEMBER.ADD',
  MEMBER_VIEW = 'MEMBER.VIEW',
  MEMBER_EDIT = 'MEMBER.EDIT',
  MEMBER_DELETE = 'MEMBER.DELETE',
  SPACE_DELETE = 'SPACE.DELETE',
  SPACE_EDIT = 'SPACE.EDIT',
  POST_ADD = 'POST.ADD',
  POST_VIEW = 'POST.VIEW',
  POST_DELETE = 'POST.DELETE', // Relates only to deleting not owned posts (own posts can be always deleted)
}

export const SPACE_PERMISSIONS_GROUP = {
  // Permissions used by default when inviting new user
  BASIC: [SpacePermissions.POST_ADD, SpacePermissions.POST_VIEW],
  // Permissions used when creating new space (for the creator user)
  CREATOR: [...Object.values(SpacePermissions)],
} as const;

const spaceMemberSchema = new Schema<SpaceMember>(
  {
    user: { type: ObjectIdType, ref: 'User', required: true },
    spaceId: { type: ObjectIdType, ref: 'Space', required: true },
    permissions: [
      {
        type: String,
        enum: Object.values(SpacePermissions),
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Validate if proper permission has been set on the space member
spaceMemberSchema.path('permissions').validate((permissions: SpacePermissions[]) => {
  const isInvalidPermission = permissions.some((permission) => !Object.values(SpacePermissions).includes(permission));

  return !isInvalidPermission;
});

const SpaceMemberModel = model('SpaceMember', spaceMemberSchema);

export { SpaceMemberModel };
