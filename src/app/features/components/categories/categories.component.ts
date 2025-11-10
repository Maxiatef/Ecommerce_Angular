import { Component, OnInit } from '@angular/core';
import { CategoriesserviceService } from '../../services/categories/categoriesservice.service';
import { Categories } from '../../interfaces/categories';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  constructor(private categoriesService: CategoriesserviceService) {}
  categories: Categories[] = [];
  loading: boolean = true;
  ngOnInit() {
    this.categoriesService.getapiData().subscribe({
      next: (data: any) => {
        this.loading = false;
        console.log('cat', data);
        this.categories = data.data;
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completed'),
    });
  }
}
