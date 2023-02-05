export type UserResponse = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  city: string | null;
  country: 'PL' | 'US';
  avatar: string;
  createdAt: string;
  updatedAt: string;
};
