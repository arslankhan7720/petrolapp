import { ApiService } from './services/api.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(public snackBar: MatSnackBar, private apiService: ApiService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let petrol_token: any = JSON.parse(localStorage.getItem('petrol_token'));
        // console.log(' interceptor petrol_token ', petrol_token);
        if (petrol_token !== null && petrol_token.length > 0) {
            req = req.clone({ headers: req.headers.set('Authorization', `Bearer ${petrol_token}`) });
        }
        // return next.handle(req);

        // add interceptor to the call back from server,
        // if token expired then show message that session expired.
        return next.handle(req).pipe(
          map((res: any) => {
            if (res && res.status === 401) {
              this.showSnackBar(res.message);
            }
            return res;
          }),
          catchError((e: any) => {
            this.throwErrorsResponse(e && e.status ? e : 500);
            return throwError(e);
          })
        );

    }


  throwErrorsResponse = (e: any) => {
    const { status, error } = e;
    console.log(`throw errors response ===> status === ${status} error === `, "error ", error, " e === ", e);
    switch (status) {
      case 400:
        this.showSnackBar(error.message);
        break;
      case 500:
        this.showSnackBar(error.message);
        break;
      case 401:
        this.showSnackBar(error.message);
        break;
      default:
    }
  }

  showSnackBar(message: string){
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';
    config.duration = 3000;
    let snackBarRef = this.snackBar.open(message, 'Login', config);
    snackBarRef.onAction().subscribe(() => {
      this.apiService.logout();
    });
  }


}
