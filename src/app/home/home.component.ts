import { ApiResponse } from './../services/api-response';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  saleReport: any;
  purchaseReport: any;
  expenseReport: any;
  paymentReport: any;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSaleReport();
    this.getPurchaseReport();
    this.getExpenseReport();
    this.getPaymentReport();
  }

  getSaleReport(){
    this.apiService.getSaleReport().subscribe((resp: ApiResponse) => {
      console.log(' getSaleReport ', resp);
      this.saleReport = resp.data;
    });
  }

  getPurchaseReport(){
    this.apiService.getPurchaseReport().subscribe((resp: ApiResponse) => {
      console.log(' getPurchaseReport ', resp);
      this.purchaseReport = resp.data;
    });
  }

  getExpenseReport(){
    this.apiService.getExpenseReport().subscribe((resp: ApiResponse) => {
      console.log(' getExpenseReport ', resp);
      this.expenseReport = resp.data;
    });
  }

  getPaymentReport(){
    this.apiService.getPaymentReport().subscribe((resp: ApiResponse) => {
      console.log(' getPaymentReport ', resp);
      this.paymentReport = resp.data;
    });
  }










}
