import { Component, OnInit } from '@angular/core';
import { RecentproductService } from '../../services/product/recentproduct.service';
import { Recentproductinterface } from '../../interfaces/recentproductinterface';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { OneproductService } from "../../services/oneproduct/oneproduct.service";
import { CartService } from '../../services/cart/cart.service';



@Component({
  selector: 'app-recentproduts',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './recentproduts.component.html',
  styleUrl: './recentproduts.component.css'
})
export class RecentprodutsComponent implements OnInit {
  constructor(private _recentproductService: RecentproductService, private _oneproductService: OneproductService,private _cartService: CartService) { }

  recentproducts: Recentproductinterface[] = [];
  calling: any;
  loading: boolean = true;
  getDataFromApi() {

    this.calling = this._recentproductService.getapiData().subscribe({
      next: (data: any) => {
        this.loading = false;
        console.log(data.data);
        this.recentproducts = data.data;
        // console.log(this.recentproducts[0].category.name);
      },
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completed')
    });
  }

  getproductbyid(id: string) {
    this._oneproductService.getProductById(id).subscribe({
      next: (data) => {
        console.log(data);
        this._cartService?.addToCart(data.data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  ngOnInit() {
    this.getDataFromApi();
  }

}

