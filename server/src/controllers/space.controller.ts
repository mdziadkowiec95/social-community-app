import { SpaceModel, SpaceType } from '../models/Space.model';
import { SpaceMemberModel, SPACE_PERMISSIONS_GROUP } from '../models/SpaceMember.model';
import { withAuth } from '../router/helpers';
import { LoggerService } from '../services/logger.service';
import { CreateSpaceRequest, GetSpaceRequest, GetSpacesRequest } from '../types/space.types';
import { getErrorResponse } from '../utilities/error-handling';

const spaceController = {
  createSpace: withAuth<CreateSpaceRequest>(async (req, res) => {
    try {
      const { name } = req.body;

      const existingSpace = await SpaceModel.findOne({
        name,
      });

      if (existingSpace) {
        return res.json({
          status: 409,
          errors: ['Space with such the same name already exists.'],
        });
      }

      const space = new SpaceModel({
        name,
        type: req.body.type,
        createdBy: req.user.id,
        members: [],
      });

      const spaceMember = new SpaceMemberModel({
        user: req.user.id,
        spaceId: space._id,
        permissions: SPACE_PERMISSIONS_GROUP.CREATOR,
      });

      await spaceMember.save();

      space.members.push(req.user.id);

      await space.save();

      res.json(space);
    } catch (error) {
      LoggerService.error(error);

      return res.status(500).json(getErrorResponse(error, 500));
    }
  }),

  getSpaces: withAuth<GetSpacesRequest>(async (req, res) => {
    try {
      // Get spaces where user is a member or it is not PRIVATE
      const spaces = await SpaceModel.find({
        $or: [{ members: req.user.id }, { type: SpaceType.PUBLIC }, { type: SpaceType.NON_PUBLIC }],
      });

      res.json(spaces);
    } catch (error) {
      LoggerService.error(error);

      return res.status(500).json(getErrorResponse(error, 500));
    }
  }),

  getSpace: withAuth<GetSpaceRequest>(async (req, res) => {
    try {
      // Get spaces where user is a member or it is not PRIVATE
      const space = await SpaceModel.findById(req.params.spaceId);

      if (!space) {
        return res.status(404).json({
          status: 404,
          errors: [`Space with ID=${req.params.spaceId} not found.`],
        });
      }

      // Allow accessing PRIVATE spcae only if user is a space member
      if (space.type === SpaceType.PRIVATE && !space.members.includes(req.user.id)) {
        return res.status(403).json({
          status: 403,
          errors: [`You are not authorized to access space with ID=${req.params.spaceId}`],
        });
      }

      const spaceMember = await SpaceMemberModel.findOne({
        spaceId: space._id,
        user: req.user.id,
      });

      res.json({
        ...space.toObject(),
        permissions: spaceMember ? spaceMember.permissions : [],
      });
    } catch (error) {
      LoggerService.error(error);

      return res.status(500).json(getErrorResponse(error, 500));
    }
  }),
};

export { spaceController };
