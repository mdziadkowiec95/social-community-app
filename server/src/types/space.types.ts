import type { Request } from 'express';
import { Space, SpaceType } from '../models/Space.model';
import { DocumentType } from './api.types';
import { Empty } from './common.types';

type CreateSpaceBody = {
  name: string;
  type: SpaceType;
};

type CreateSpaceResponse = {
  name: string;
};

type GetSpacesResponse = { _id: string; name: string }[];

type GetSpaceResponse = DocumentType<Space>;

export type CreateSpaceRequest = Request<Empty, CreateSpaceResponse, CreateSpaceBody, Empty>;
export type GetSpacesRequest = Request<Empty, GetSpacesResponse, any, Empty>;
export type GetSpaceRequest = Request<
  {
    spaceId: string;
  },
  GetSpaceResponse,
  unknown,
  Empty
>;

export type SpaceRequests = CreateSpaceRequest | GetSpacesRequest;
