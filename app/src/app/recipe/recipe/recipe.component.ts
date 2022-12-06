import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { IRecipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent {

  recipe: IRecipe | undefined;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
    ) {
      this.fetchRecipe();
    }

  fetchRecipe(): void{
    this.recipe = undefined;
    const id = this.activatedRoute.snapshot.params['recipeId'];
    // console.log(this.activatedRoute.snapshot.params['recipeId']);
    this.apiService.loadRecipe(id).subscribe(recipe => this.recipe = recipe);
  }

  get isLogged(): boolean {
    return this.authService.isLogged;
  }

}
