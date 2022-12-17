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
    return this.httpClient.get<IRecipe[]>(`/api/recipes`)
  }

  loadTopRecipes() {
    return this.httpClient.get<IRecipe[]>(`/api/recipes/top`)
  }

  loadRecipe(id: string) {
    return this.httpClient.get<IRecipe>(`/api/recipes/${id}`);
  }

  saveRecipe(data: {
    recipeName: string;
    imgUrl: string;
    category: string;
    products: string;
    preparation: string;
  }) {
    return this.httpClient.post<IRecipe>(`/api/recipes`, data)
  }

  updateRecipe(data: {
    recipeName: string;
    imgUrl: string;
    category: string;
    products: string;
    preparation: string;
  }, recipeId: string | undefined){
    return this.httpClient.put<IRecipe>(`/api/recipes/${recipeId}`, data).pipe(
      tap((recipe) => this.recipe = recipe)
    );
  }

  likeRecipe(recipeId: string | undefined){
    // console.log("like "+recipeId);
    return this.httpClient.put<IRecipe>(`/api/recipes/like/${recipeId}`, '').pipe(
      tap((recipe) => this.recipe = recipe)
    );
  }

  dislikeRecipe(recipeId: string | undefined){
    // console.log("dislike "+recipeId);
    return this.httpClient.put<IRecipe>(`/api/recipes/dislike/${recipeId}`, '').pipe(
      tap((recipe) => this.recipe = recipe)
    );
  }
}
