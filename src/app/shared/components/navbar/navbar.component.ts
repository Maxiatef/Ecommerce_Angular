import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  // islogged = localStorage.getItem('token');
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private _router: Router) { }


  islogged: string | null = null;


  signOut() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      this.islogged = null;
      this._router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.islogged = localStorage.getItem('token');
    }
  }

}
