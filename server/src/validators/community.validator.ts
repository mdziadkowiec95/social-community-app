import * as yup from 'yup';

const CreateCommunityInputValidator = yup.object().shape({
  name: yup.string().max(100).required(),
  description: yup.string().max(500),
});

export { CreateCommunityInputValidator };
