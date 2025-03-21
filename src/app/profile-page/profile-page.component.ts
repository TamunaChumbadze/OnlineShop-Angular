import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  constructor(public api: ApiService, public cookie: CookieService, public router: Router) {
    this.getUserData()
  }


  getUserData() {
    this.api.getUser().subscribe((data:any) => {
      console.log(data);
      
    })
  }


  signOut() {
    this.cookie.delete("user")
    this.router.navigate(["/"])
  }
}
