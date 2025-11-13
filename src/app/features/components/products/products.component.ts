import { Component } from '@angular/core';
import { RecentprodutsComponent } from "../../../shared/components/recentproduts/recentproduts.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RecentprodutsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
