import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeRoutingModule } from './recipe-routing,module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecipeComponent,
    NewRecipeComponent,
    RecipesComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class RecipeModule { }
