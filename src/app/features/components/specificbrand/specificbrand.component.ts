import { Component } from '@angular/core';
import { Brands } from '../../interfaces/brands';
import { BrandService } from '../../services/brands/brand.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecentproductService } from '../../services/product/recentproduct.service';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { Recentproductinterface } from '../../interfaces/recentproductinterface';
import { AddtocartService } from '../../services/cart/addtocart.service';
import { GetusercartService } from '../../services/cart/getusercart.service';

@Component({
  selector: 'app-specificbrand',
  standalone: true,
  imports: [RouterLink, LoaderComponent],
  templateUrl: './specificbrand.component.html',
  styleUrl: './specificbrand.component.css',
})
export class SpecificbrandComponent {
  brandId: string = '';
  item!: Brands;
  products: Recentproductinterface[] = [];
  loading: boolean = true;
  productloader: boolean = true;
  //recentproducts: Recentproductinterface[] = [];
  

  constructor(
    private brandService: BrandService,
    private route: ActivatedRoute,
    private recentProductsService: RecentproductService,
    private _addtocartService: AddtocartService,
    private _getusercartService: GetusercartService
  ) {}
  ngOnInit() {
    this.brandId = this.route.snapshot.paramMap.get('id') as string;
    this.brandService.getspecificbrand(this.brandId).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.item = data.data;
        console.log('brand', data);
        this.recentProductsService.getapiData().subscribe({
          next: (res: any) => {
            this.productloader = false;
            const all = res.data || [];
            this.products = all.filter((p: any) => {
              if (p.brand && (p.brand._id || p.brand.id)) {
                const bid = p.brand._id || p.brand.id; 
                return bid === this.brandId;
               
                
              }
              return p.brand && p.brand.name === this.item.name;
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
