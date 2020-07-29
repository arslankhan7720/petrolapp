import { ApiService } from './../services/api.service';
import { FirebaseService } from './../services/firebase.service';
// import { PayloadService } from './../services/payload.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { RoleService } from '../services/role.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private fbs: FirebaseService,
    private apiService: ApiService
    ) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.apiService.currentUserValue;
    // console.log(' canActivate ', currentUser);
    if (currentUser) {  return true; }
    // not logged in so redirect to login page with the return url

    // console.log(' returning to login  ');
    this.router.navigate(['/login']);
    return false;
  }


// canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//   if (this.fbs.isLoggedIn !== true) { this.router.navigate(['login']); }
//   return true;
// }


}
