import { User } from './user';

export type Comment = {
    _id: string;
    author: User;
    comment: string;
    date: Date;
  };
  