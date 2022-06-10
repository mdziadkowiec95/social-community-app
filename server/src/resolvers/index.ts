import { Resolvers } from '../types/__generated__/resolvers.types';

const resolvers: Resolvers = {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.find();
    },
  },
};

export { resolvers };
