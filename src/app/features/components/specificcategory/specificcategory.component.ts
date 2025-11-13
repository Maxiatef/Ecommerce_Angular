import { Component, OnInit } from '@angular/core';
import { CategoriesserviceService } from '../../services/categories/categoriesservice.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Categories } from '../../interfaces/categories';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RecentproductService } from '../../../shared/services/product/recentproduct.service';
import { Recentproductinterface } from '../../../shared/interfaces/recentproductinterface';
import { GetusercartService } from '../../services/cart/getusercart.service';
import { AddtocartService } from '../../services/cart/addtocart.service';

@Component({
  selector: 'app-specificcategory',
  standalone: true,
  imports: [CommonModule, LoaderComponent, RouterLink],
  templateUrl: './specificcategory.component.html',
  styleUrl: './specificcategory.component.css'
})
export class SpecificcategoryComponent implements OnInit {
  categoryId: string = '';
  item!: Categories;
  products: Recentproductinterface[] = [];
  loading: boolean = true;
  //recentproducts: Recentproductinterface[] = [];
  

  constructor(
    private categoriesService: CategoriesserviceService,
    private route: ActivatedRoute,
    private recentProductsService: RecentproductService,
    private _addtocartService: AddtocartService,
    private _getusercartService: GetusercartService
  ) {}

  ngOnInit() {
    this.categoryId = (this.route.snapshot.paramMap.get('id') as string);
    this.categoriesService.getspecificcategory(this.categoryId).subscribe({
      next: (data: any) => {
        this.item = data.data;
        // Load all products and filter client-side by category id/name
        this.recentProductsService.getapiData().subscribe({
          next: (res: any) => {
            const all = res.data || [];
            this.products = all.filter((p: any) => {
              if (p.category && (p.category._id || p.category.id)) {
                const cid = p.category._id || p.category.id;
                return cid === this.categoryId;
              }
              return p.category && p.category.name === this.item.name;
            });
            this.loading = false;
          },
          error: (err) => {
            console.error('Products load error', err);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }
   addToCart(id: string) {
    this._addtocartService.addToCart(id).subscribe({
      next: (data) => {
        console.log(data, 'added to cart');
        // Refresh cart to update count immediately
        this._getusercartService.refreshCart();
      },
      error: (error) => {
        console.error(error);
      }
    });
}}
