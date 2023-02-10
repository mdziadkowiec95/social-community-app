export interface UserJWTPayload {
  user: {
    id: string;
  };
}

export type WithAuth<R> = R & {
  user: {
    id: string;
  };
};
