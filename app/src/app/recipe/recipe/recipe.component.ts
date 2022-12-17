import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  inUpdateMode: boolean = false;
  likeable: boolean = false;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {
    this.fetchRecipe();
  }

  fetchRecipe(): void {
    this.recipe = undefined;
    const id = this.activatedRoute.snapshot.params['recipeId'];
    this.apiService.loadRecipe(id).subscribe(recipe => {
      this.recipe = recipe;
      if (this.recipe.likes.includes(String(this.authService.user?._id))) {
        this.likeable = false;
      } else {
        this.likeable = true;
      }

    });
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
      error: (err) => {
        console.log(err);
      }
    })
  }

  like(): void {
    this.apiService.likeRecipe(this.recipe?._id).subscribe({
      next: () => {
        this.fetchRecipe();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  dislike(): void {
    this.apiService.dislikeRecipe(this.recipe?._id).subscribe({
      next: () => {
        this.fetchRecipe();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteRecipe(): void {
    this.apiService.deleteRecipe(this.recipe?._id).subscribe({
      next: () => {
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
