import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule,],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public formInfo: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(5)]),
    lastName: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    age: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    address: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    phone: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    zipcode: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    avatar: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
  });

  public isDropdownOpen = false;
  public selectedGender: string = '';

  constructor(public service: ApiService, private router: Router) { }

 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectGender(gender: string) {
    this.selectedGender = gender;
    this.isDropdownOpen = false; 
    this.formInfo.controls['gender'].setValue(gender);  
  }

  register() {
    this.service.signUp(this.formInfo.value).subscribe({
      next: (data: any) => {
        console.log(data);
  
        
        alert("თქვენ წარმატებით გაიარეთ რეგისტრაცია!");
  
       
        if (confirm("Login or Shoping? Press OK for Login, Cancel for See Shop")) {
          this.router.navigate(['/login']); 
        } else {
          this.router.navigate(['/shop-all-products']);
        }
      },
      error: (err: any) => console.log(err),
    });
  }
  
}
