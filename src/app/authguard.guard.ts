import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService);
  const router = inject(Router)

  if (cookie.get('user')) {
    return true;
  } else {
    let question = confirm("არ ხარ ავტორიზებული, გსურთ შესვლა?")
    if(question) {
      router.navigate(["/login"])
      return false;
    }
    else {
      router.navigate(["/"])
      return false;
    }
    
    
  }
};
