### base url:
https://localhost:3000/api

### endpoints:
users:

.post /register - register new user
.post /login - login user
.post /logout - logout user

.get /profile - get user info
.put /profile - edit user info


recipes:

.get /recipes - get all recipes
.get /recipes/top - show top 4 recipes with most likes
.post /recipes - create recipe for registered user
.get /recipes/:recipeId - get recipe info
.put /recipes/like/:recipeId - like the recipe
.put /recipes/dislike/:recipeId - remove like from recipe
.put /recipes/:recipeId - edit recipe info
.delete /recipes/:recipeId - delete recipe

### data interface
recipes {
  _id: string,
  userId: IUser,
  created_at: string,
  updatedAt: string,
  __v: number,
  recipeName: string,
  comments: string[],
  likes: string[],
  likesCount: number;
  imgUrl: string,
  category: string,
  products: string,
  preparation: string
}

users {
  _id: string,
  email: string,
  password: string,
  personName: string,
  sex: string,
  created_at: string,
  updatedAt: string,
  __v: number
}
