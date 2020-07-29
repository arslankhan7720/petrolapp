import { Router } from '@angular/router';
import { ApiResponse } from './../../services/api-response';
import { MatDialog, MatDatepickerInputEvent, MatInput } from '@angular/material';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { ApiService } from '../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
// import * as _moment from 'moment';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  purchaseList = [];
  statistics;
  tanksList: any;
  preloader: boolean = true;
  page: number = 0;
  loadMoreExist: boolean = true;

  displayedColumns2: string[] = ['id', 'title', 'quantity', 'tank', 'expense', 'date', 'action'];
  @ViewChild('filter_from', { read: MatInput }) filter_from: MatInput;
  @ViewChild('filter_to', { read: MatInput }) filter_to: MatInput;
  @ViewChild('filter_tank') filter_tank: any;
  @ViewChild('filter_orderBy') filter_orderBy: any;
  @ViewChild('filter_orderDir') filter_orderDir: any;


  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private router: Router
    ) { }

  ngOnInit() {
    // this.flterFromValue = new Date();
    this.apiService.getTanks().subscribe((res: ApiResponse) => {
      if ( res.status ){ this.tanksList =  res.data; }
    });
    this.loadData();
  }



  loadData(){
    this.preloader = true;
    const filterData = {
      filter_from: this.filter_from.value,
      filter_to:  this.filter_to.value,
      filter_tank:  this.filter_tank.value,
      filter_orderBy: this.filter_orderBy.value,
      filter_orderDir: this.filter_orderDir.value,
      page: this.page
    };

    console.log(' filterData ',  filterData );
    this.apiService.getPurchase(filterData).subscribe((resp) => {
      console.log(' getPurchase ', resp );
      this.preloader = false;
      this.purchaseList = [...this.purchaseList, ...resp.data.list];
      this.statistics = resp.data.statistics;
      this.loadMoreExist =   (resp.data.list.length < 20)?0:(resp.data.list.length);
    });
  }

  loadMore(){
    this.page = this.page+1;
    this.loadData();
  }

  removeItem(pid){
    const message = `Are you sure to Delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    }).afterClosed().subscribe(dialogResult => {

      if (dialogResult) {
        this.apiService.DeletePurchase(pid).subscribe((resp) => {
          console.log(' DeletePurchase ', resp );
          if(resp.status){
            this.purchaseList = this.purchaseList;
            this.purchaseList = this.purchaseList.filter(p => p.id != pid);
          }
        });

      }
    });
  }

  editItem(id){
    this.router.navigate(['purchase/edit',id]);
  }

  searchData(){
    this.purchaseList = [];  this.statistics = ''; this.page = 0;
    this.loadData();
  }

  resetFilter(){
    this.purchaseList = [];
    this.statistics = '';
    this.page = 0;

   this.filter_from.value = '';
   this.filter_to.value = '';
   this.filter_tank.value = '';
   this.filter_orderBy.value = '';
   this.filter_orderDir.value = '';
   this.loadData();
  }


  filterFrom(event: MatDatepickerInputEvent<Date>) {
    console.log('  filterFrom event.value ', event.value );
    let _dateFrom = this.datepipe.transform(event.value, 'yyyy--MM--dd');
    console.log(' dateFrom ', _dateFrom );
  }


}
