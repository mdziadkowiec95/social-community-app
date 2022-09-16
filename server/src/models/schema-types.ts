import { Schema } from 'mongoose';

export const ObjectIdType = Schema.Types.ObjectId as unknown as typeof String;
