/* eslint-disable @typescript-eslint/ban-types */
import express from 'express';
import { spaceController } from '../../controllers/space.controller';
import { authenticateUser } from '../../middlewares/authenticateUser';

const router = express.Router();

/**
 * POST /api/v1/spaces
 * @summary Creates a new space for the user
 * @param {CreateSpaceRequestBody} request.body.required - name param description
 * @example request - payload example
 * {
 *   "name": "My space",
 *   "type": "PRIVATE"
 * }
 * @return {object} 200 - success response
 *
 */
router.post('/', [authenticateUser], spaceController.createSpace);

/**
 * GET /api/spaces
 */
router.get('/', [authenticateUser], spaceController.getSpaces);

/**
 * GET /api/spaces
 */
router.get('/:spaceId', [authenticateUser], spaceController.getSpace);

export { router as spacesRouter };
