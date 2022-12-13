import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  createRecipe(form: NgForm): void {
    if (form.invalid) { return; }
    console.log("form value");
    console.log(form.value);
    this.apiService.saveRecipe(form.value).subscribe({
      next: () => {
        console.log('here');
        this.router.navigate(['/recipes']);
      },
      error: (err) => {
        console.log('here2');

        console.log(err);
      }
    })
  }
}
