import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
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
        this.router.navigate(['/']); 
        this.close.emit();  
      },
      error: (err: any) => {
        console.log(err);  
      }
    });
  }


  closeCard() {
    this.router.navigate(['/']); 
    this.close.emit();  
  }
}
