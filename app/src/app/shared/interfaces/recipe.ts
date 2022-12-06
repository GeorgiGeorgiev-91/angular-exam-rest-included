import { IUser } from './user';

export interface IRecipe {
  _id: string,
  userId: IUser,
  created_at: string,
  updatedAt: string,
  __v: number,
  recipeName: string,
  comments: string[],
  likes: string[],
  likesCount: number;
  imgUrl: string
}
