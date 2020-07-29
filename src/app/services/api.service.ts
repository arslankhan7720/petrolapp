import { ApiResponse } from './api-response';
import { User } from './user';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  // constructor(private http: HttpClient) { }

  constructor(private _http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('petrol_admin')));
    this.currentUser = this.currentUserSubject.asObservable();
  }



   // function to get user data from api by passing username, email.
   login(username: string, password: string) {
    const apiHeaders = new HttpHeaders();
    apiHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
    const credentials = { 'username': username, 'password': password };  // 'grant_type=password' + '&username=' + username + '&password=' + password;
    return this._http.post<any>(environment.api.baseUrl + '/login', credentials, { headers: apiHeaders })
        .pipe(map((resp) => {
          console.log(' login  resp ', resp);
            // login successful if there's a jwt token in the response
            if (resp && resp.access_token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('petrol_admin', JSON.stringify(resp.data));
                localStorage.setItem('petrol_token', JSON.stringify(resp.access_token));
                this.currentUserSubject.next(resp.data);


                  console.log(' navigate to home ',this.currentUserValue);
                  this.router.navigateByUrl('/home');

            }
            return resp.data;
        }));
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('petrol_admin');
    localStorage.removeItem('petrol_token');
    this.currentUserSubject.next(null);
}


   createPruchase(formData){
    console.log(' createPruchase ', formData);
    return this._http.post(`${environment.api.baseUrl}/purchase/save`, formData)
    .pipe(
      tap((response: ApiResponse) => {
        if (!response.status) {
          console.warn(`createPruchase ${formData}`);
        }
      })
    );
  }



  UpdatePruchase(id,formData){
    console.log(' createPruchase ', formData);
    return this._http.post(`${environment.api.baseUrl}/purchase/update/${id}`, formData)
    .pipe(
      tap((response: ApiResponse) => {
        if (!response.status) {
          console.warn(`createPruchase ${formData}`);
        }
      })
    );
  }

  DeletePurchase(id){
    console.log(' DeletePurchase ',id);
    return this._http.post(`${environment.api.baseUrl}/purchase/delete/${id}`,{})
    .pipe(
      tap((response: ApiResponse) => {
        if (!response.status) {
          console.warn(`DeletePurchase ${id}`);
        }
      })
    );
  }



  getPurchase(filterData){
    return this._http.post(`${environment.api.baseUrl}/purchase`, filterData)
    .pipe(
      tap((response: ApiResponse) => {
        if (!response.status) {
          console.warn(`getPurchase`);
        }
      })
    );
  }

  getPurchaseDetail(id: number){
    return this._http.get(`${environment.api.baseUrl}/purchaseDetail/${id}`)
    .pipe(
      tap((response: ApiResponse) => {
        if (!response.status) {
          console.warn(`getPurchaseDetail ${id}`);
        }
      })
    );
  }


  //========================== Tanks ==========================//
  createTank(formData){
    console.log(' createTank ', formData);
    return this._http.post(`${environment.api.baseUrl}/tank/save`, formData)
    .pipe(tap((response: ApiResponse) => {
        if (!response.status) { console.warn(`createTank ${formData}`); }
    }));
  }

  getTanks(){
    return this._http.get(`${environment.api.baseUrl}/tanks`).
    pipe(tap((response: ApiResponse) => {
        if (!response.status) { console.warn(`getTanks`); }
    }));
  }


  //========================== Sale ==========================//

  createSale(formData){
    console.log(' createPruchase ', formData);
    return this._http.post(`${environment.api.baseUrl}/sale/save`, formData)
    .pipe(tap((response: ApiResponse) => {
        if (!response.status) { console.warn(`createSale ${formData}`); }
    }));
  }



  UpdateSale(id,formData){
    console.log(' UpdateSale ', formData);
    return this._http.post(`${environment.api.baseUrl}/sale/update/${id}`, formData)
    .pipe(
      tap((response: ApiResponse) => {
        if (!response.status) {
          console.warn(`UpdateSale ${formData}`);
        }
      })
    );
  }

  DeleteSale(id){
    console.log(' DeleteSale ',id);
    return this._http.post(`${environment.api.baseUrl}/sale/delete/${id}`,{})
    .pipe(tap((response: ApiResponse) => {
        if (!response.status) { console.warn(`DeleteSale ${id}`); }
    }));
  }



  getSale(filterData){
    return this._http.post(`${environment.api.baseUrl}/sale`, filterData)
    .pipe(tap((response: ApiResponse) => {
        if (!response.status) {console.warn(`getSale`);}
      }));
  }

  getSaleDetail(id: number){
    return this._http.get(`${environment.api.baseUrl}/saleDetail/${id}`)
    .pipe(tap((response: ApiResponse) => { if (!response.status) { console.warn(`getSaleDetail ${id}`); }}));
  }


  getSaleReport(){
    return this._http.get(`${environment.api.baseUrl}/report/saleReport`)
    .pipe(tap((response: ApiResponse) => { if (!response.status) { console.warn(`getSaleReport`); }}));
  }


  getPurchaseReport(){
    return this._http.get(`${environment.api.baseUrl}/report/purchaseReport`)
    .pipe(tap((response: ApiResponse) => { if (!response.status) { console.warn(`getPurchaseReport`); }}));
  }

  getExpenseReport(){
    return this._http.get(`${environment.api.baseUrl}/report/expenseReport`)
    .pipe(tap((response: ApiResponse) => { if (!response.status) { console.warn(`getExpenseReport`); }}));
  }

  getPaymentReport(){
    return this._http.get(`${environment.api.baseUrl}/report/paymentReport`)
    .pipe(tap((response: ApiResponse) => { if (!response.status) { console.warn(`getPaymentReport`); }}));
  }



  //============================================= Investor =============================================//
  createInvestor(formData){
    return this._http.post(`${environment.api.baseUrl}/investor/save`, formData)
    .pipe(tap((response: ApiResponse) => { if (!response.status) { console.warn(`createInvestor ${formData}`); } }));
  }

  getInvestors(){
    return this._http.get(`${environment.api.baseUrl}/investors`)
    .pipe(tap((response: ApiResponse) => { if (!response.status) { console.warn(`getInvestors`); } }));
  }



  //============================================= Payments =============================================//
  createPayment(formData){
    return this._http.post(`${environment.api.baseUrl}/payment/save`, formData)
    .pipe(tap((response: ApiResponse) => { if (!response.status) { console.warn(`createPayment ${formData}`); } }));
  }

  getPayments(filterData){
    return this._http.post(`${environment.api.baseUrl}/payments`, filterData).pipe(tap((response: ApiResponse) => {
        if (!response.status) {console.warn(`getPayments`);}
      }));
  }

  DeletePayment(id){
    console.log(' DeletePayment ',id);
    return this._http.post(`${environment.api.baseUrl}/payment/delete/${id}`,{}).pipe(tap((response: ApiResponse) => {
        if (!response.status) { console.warn(`DeletePayment ${id}`); }
    }));
  }


  UpdatePayment(id, paymentData){
    console.log(' UpdatePayment ', paymentData);
    return this._http.post(`${environment.api.baseUrl}/payment/update/${id}`, paymentData).pipe(
      tap((response: ApiResponse) => { if (!response.status) { console.warn(`UpdatePayment ${paymentData}`);}
    }));

  }





  //============================================= Expense =============================================//
  createExpense(formData){
    return this._http.post(`${environment.api.baseUrl}/expense/save`, formData)
    .pipe(tap((response: ApiResponse) => { if (!response.status) { console.warn(`createExpense ${formData}`); } }));
  }

  getExpenses(filterData){
    return this._http.post(`${environment.api.baseUrl}/expenses`, filterData).pipe(tap((response: ApiResponse) => {
        if (!response.status) {console.warn(`getExpenses`);}
      }));
  }

  DeleteExpense(id){
    console.log(' DeleteExpense ',id);
    return this._http.post(`${environment.api.baseUrl}/expense/delete/${id}`,{}).pipe(tap((response: ApiResponse) => {
        if (!response.status) { console.warn(`DeleteExpense ${id}`); }
    }));
  }

  UpdateExpense(id, paymentData){
    console.log(' UpdatePayment ', paymentData);
    return this._http.post(`${environment.api.baseUrl}/expense/update/${id}`, paymentData).pipe(
      tap((response: ApiResponse) => { if (!response.status) { console.warn(`UpdateExpense ${paymentData}`);}
    }));
  }


}
