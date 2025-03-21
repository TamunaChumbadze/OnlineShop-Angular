import { Component, signal } from '@angular/core';
import { SigninComponent } from "../signin/signin.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScrollingNavDirective } from '../scrolling-nav.directive';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [SigninComponent, RouterModule, CommonModule, ScrollingNavDirective]  
})
export class NavbarComponent {
  loginCardVisible = signal(false);
  
  constructor(private router: Router) {}

  showLoginCard() {
    this.loginCardVisible.set(true);
  }

  hideLoginCard() {
    this.loginCardVisible.set(false);
    this.router.navigate(['/']);
  }
}
