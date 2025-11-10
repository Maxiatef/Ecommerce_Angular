import { Component } from '@angular/core';
import { BrandService } from '../../services/brands/brand.service';
import { Brands } from '../../interfaces/brands';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [LoaderComponent, RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
    constructor(private brandsService: BrandService) {}
    brands: Brands [] = [];
    loading: boolean = true;
    ngOnInit() {
      this.brandsService.getapiData().subscribe({
        next: (data: any) => {
          this.loading = false;
          console.log(data);
          this.brands = data.data;
        },
        error: (error) => console.error('Error:', error),
        complete: () => console.log('Completed'),
      });

}}
