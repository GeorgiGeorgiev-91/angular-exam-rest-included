import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipesComponent } from './recipes/recipes.component';

const routes: Routes = [
  {
    path: 'recipes',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: RecipesComponent
      },
      {
        path: ':recipeId',
        component: RecipeComponent
      }
    ]
  },
  {
    path: 'add-recipe',
    component: NewRecipeComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/login',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
