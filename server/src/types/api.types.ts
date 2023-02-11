export type DocumentType<T> = T & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
