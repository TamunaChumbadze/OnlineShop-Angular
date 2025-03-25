import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { authguardGuard } from './authguard.guard';
import { AboutComponent } from './about/about.component';
import { ContactsComponent } from './contacts/contacts.component';
import { RegisterComponent } from './register/register.component';
import { ShopAllProductsComponent } from './shop-all-products/shop-all-products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [authguardGuard],
  },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },
  {path: 'register', component: RegisterComponent},
  { path: 'shop-all-products', component: ShopAllProductsComponent},
  { path: 'product-details/:_id', component: ProductDetailsComponent },
  {path: 'cart', component: CartComponent},
  {path: "profile", component: ProfilePageComponent
  },
  {path: 'signin', component: SigninComponent}

 
];
