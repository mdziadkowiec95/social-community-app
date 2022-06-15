export const getErrorMessage = (error: any) => {
  if (error && error?.errors) {
    // Handle MongoDB schema validation error case
    if (error.name === 'ValidationError') {
      const validationErrors: { [k: string]: string } = {};

      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });

      return Object.entries(validationErrors)
        .reduce((acc, [key, message]) => [...acc, `${key} : ${message}`], [] as string[])
        .join(' | ');
    }

    // Handle Yup validation error case
    return error.errors.join(', ');
  }

  // Default case
  return error.message;
};
