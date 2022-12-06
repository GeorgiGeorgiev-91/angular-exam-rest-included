import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { IRecipe } from '../shared/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  recipes: IRecipe[] | null = null;
  errorFetchingData = false;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.loadTopRecipes().subscribe({
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
