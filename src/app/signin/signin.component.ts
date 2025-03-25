import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  
})
export class SigninComponent {

  @Output() close = new EventEmitter<void>();  

  constructor(public api: ApiService, public cookies: CookieService, public router: Router) {}

  public formInfo: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });


  login() {
    this.api.signIn(this.formInfo.value).subscribe({
      next: (data: any) => {
        this.cookies.set('user', data.access_token);
        
        alert("თქვენ წარმატებით გაიარეთ ავტორიზაცია!");
  
      
        if (confirm("Profile or Shoping? Press OK for Profile, Cancel for See Shop")) {
          this.router.navigate(['/profile']);
        } else {
          this.router.navigate(['/shop-all-products']); 
        }
      },
      error: (err: any) => console.log(err),
    });
  }


  closeCard() {
    this.router.navigate(['/']); 
    this.close.emit();  
  }
}
