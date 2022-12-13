import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { IRecipe } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: IRecipe[] | undefined;
  errorFetchingData = false;

  public selectedPage = 1;
  recipesPerPage: number = 6;
  recipesSlice: IRecipe[] | undefined;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    let pageIndex = (this.selectedPage - 1) * this.recipesPerPage;


    this.apiService.loadRecipes().subscribe({
      next: (value) => {
        this.recipes = value;
        this.recipesSlice = this.recipes?.slice(pageIndex, this.recipesPerPage)
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err);
        throw ("Error loading recipes");
      }
    })

  }

  get pageNumbers(): number[] {
    return Array(Math.ceil(this.recipes!.length / this.recipesPerPage))
      .fill(0).map((x, i) => i + 1);
  }

  changePage(page: any) {
    this.selectedPage = page;
    this.slicedRecipres();
  }

  slicedRecipres() {
    let pageIndex = (this.selectedPage - 1) * this.recipesPerPage;
    let endIndex = (this.selectedPage - 1) * this.recipesPerPage + this.recipesPerPage;
    this.recipesSlice = [];
    this.recipesSlice = this.recipes?.slice(pageIndex, endIndex);
  }
}
