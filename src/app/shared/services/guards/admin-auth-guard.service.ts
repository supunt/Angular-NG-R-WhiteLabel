import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private router: Router, private loginSvc: UserService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return new Observable(
        (observer) => {
          this.loginSvc.isLoggedIn()
            .subscribe(
                (data: User) => {
                  if (data != null) {
                    this.loginSvc.notifyLoginSuccess(data);
                    if (!data.admin) {
                      this.router.navigate(['/home']);
                    }
                    observer.next(true);
                  } else {
                    observer.next(false);
                    this.router.navigate(['/login']);
                  }
                },
                (err) => {
                    observer.next(false);
                    this.router.navigate(['/login']);
                }
            );
        }
    );
  }
}
