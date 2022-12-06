import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeRoutingModule } from './recipe-routing,module';

@NgModule({
  declarations: [
    RecipeComponent,
    NewRecipeComponent,
    RecipesComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule
  ]
})
export class RecipeModule { }
