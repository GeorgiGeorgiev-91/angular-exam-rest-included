import { IRecipe } from './recipe';
import { IUser } from './user';

export interface IComment {
  likes: string[],
  _id: string,
  text: string,
  userId: IUser,
  recipeId: IRecipe,
  created_at: string,
  updatedAt: string,
  __v: number,
}
