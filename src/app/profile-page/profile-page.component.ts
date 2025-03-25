import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  imports: [RouterModule]
})
export class ProfilePageComponent {
  public userData: any = null;
  public defaultAvatar: string = 'https://www.w3schools.com/howto/img_avatar.png'; 

  constructor(public api: ApiService, public cookies: CookieService, public router: Router) {
    this.getUserData();
  }

  getUserData() {
    this.api.getUser().subscribe({
      next: (data: any) => {
        this.userData = data;
      },
      error: (err: any) => {
        console.error('Error fetching user data', err);
        alert('დაფიქსირდა შეცდომა. გთხოვთ, ხელახლა გაიარეთ ავტორიზაცია.');
        this.router.navigate(['/signin']);
      }
    });
  }

  signOut() {
    this.cookies.delete('user');
    this.router.navigate(['/']);
  }
}
