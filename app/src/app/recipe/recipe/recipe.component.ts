import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
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

  inUpdateMode = false;

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
    this.apiService.loadRecipe(id).subscribe(recipe => this.recipe = recipe);
  }

  get isLogged(): boolean {
    return this.authService.isLogged;
  }


  get isOwner(): boolean {
    return this.recipe?.userId?._id == this.authService.user?._id
  }

  updateRecipe(form: NgForm): void {
    if (form.invalid) { return; }
    this.apiService.updateRecipe(form.value, this.recipe?._id).subscribe({
      next: () => {
          this.fetchRecipe();
          this.inUpdateMode = false;
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }

}
