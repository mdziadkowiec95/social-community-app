/* eslint-disable @typescript-eslint/ban-types */
import express from 'express';
import { spaceController } from '../controllers/space.controller';
import { authenticateUser } from '../middlewares/authenticateUser';

const router = express.Router();

/**
 * POST /api/spaces
 * Creates a new space for the user
 */
router.post('/', [authenticateUser], spaceController.createSpace);

/**
 * GET /api/spaces
 * Gets all spaces available for the user
 */
router.get('/', [authenticateUser], spaceController.getSpaces);

/**
 * GET /api/spaces
 * Gets single space for the user
 */
router.get('/:spaceId', [authenticateUser], spaceController.getSpace);

export { router as spacesRouter };
