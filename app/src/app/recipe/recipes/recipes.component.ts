import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IRecipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: IRecipe[] | null = null;
  errorFetchingData = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.loadRecipes().subscribe({
      next: (value) => {
        this.recipes = value;
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
        throw ("Error loading recipes");
      }
    })
  }

}
