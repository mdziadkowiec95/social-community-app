/* eslint-disable @typescript-eslint/ban-types */
import express from 'express';
import { authenticateUser } from '../middlewares/authenticateUser';
import { Space } from '../models/Space.model';
import { creatorSpaceMemberPermissions, SpaceMember } from '../models/SpaceMember.model';

function createSpaceRouter() {
  const router = express.Router();

  // @ts-expect-error - TODO remove
  router.post('/create', [authenticateUser], async (req, res) => {
    // eslint-disable-next-line no-console
    console.log(req.user);

    const space = new Space({
      name: 'My community',
      createdBy: req.user.id,
      members: [],
    });

    const spaceMember = new SpaceMember({
      user: req.user.id,
      spaceId: space._id,
      permissions: [...new Set([...creatorSpaceMemberPermissions])],
    });

    await spaceMember.save();

    space.members.push(spaceMember._id);

    await space.save();

    res.json({
      ok: ':D',
    });
  });

  router.get('/', async (req, res) => {
    const data = await Space.findOne({
      name: 'My community',
    }).populate(['createdBy', 'members']);

    res.json({
      data,
    });
  });

  return router;
}

export { createSpaceRouter };
