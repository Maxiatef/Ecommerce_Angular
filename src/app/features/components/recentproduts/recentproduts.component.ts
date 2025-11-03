import { Component, OnInit } from '@angular/core';
import { RecentproductService } from '../../services/product/recentproduct.service';
import { Recentproductinterface } from '../../interfaces/recentproductinterface';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";


@Component({
  selector: 'app-recentproduts',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './recentproduts.component.html',
  styleUrl: './recentproduts.component.css'
})
export class RecentprodutsComponent implements OnInit {
  constructor(private _recentproductService: RecentproductService) { }

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
  ngOnInit() {
    this.getDataFromApi();
  }

}
