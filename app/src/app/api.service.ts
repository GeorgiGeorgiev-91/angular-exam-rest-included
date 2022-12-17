import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IRecipe } from './shared/interfaces';
import { tap } from 'rxjs';

const apiURL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  recipe: IRecipe | null | undefined = undefined;

  constructor(private httpClient: HttpClient) { }

  loadRecipes() {
    return this.httpClient.get<IRecipe[]>(`${apiURL}/recipes`)
  }

  loadTopRecipes() {
    return this.httpClient.get<IRecipe[]>(`${apiURL}/recipes/top`)
  }

  loadRecipe(id: string) {
    return this.httpClient.get<IRecipe>(`${apiURL}/recipes/${id}`, { withCredentials: true });
  }

  saveRecipe(data: {
    recipeName: string;
    imgUrl: string;
    category: string;
    products: string;
    preparation: string;
  }) {
    return this.httpClient.post<IRecipe>(`${apiURL}/recipes`, data, { withCredentials: true })
  }

  updateRecipe(data: {
    recipeName: string;
    imgUrl: string;
    category: string;
    products: string;
    preparation: string;
  }, recipeId: string | undefined){
    // console.log(this);
    return this.httpClient.put<IRecipe>(`${apiURL}/recipes/${recipeId}`, data, { withCredentials: true }).pipe(
      tap((recipe) => this.recipe = recipe)
    );
  }

  likeRecipe(recipeId: string | undefined){
    // console.log("like "+recipeId);
    return this.httpClient.put<IRecipe>(`${apiURL}/recipes/like/${recipeId}`, '', { withCredentials: true }).pipe(
      tap((recipe) => this.recipe = recipe)
    );
  }

  dislikeRecipe(recipeId: string | undefined){
    // console.log("dislike "+recipeId);
    return this.httpClient.put<IRecipe>(`${apiURL}/recipes/dislike/${recipeId}`, '', { withCredentials: true }).pipe(
      tap((recipe) => this.recipe = recipe)
    );
  }
}
