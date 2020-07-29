import { EditPaymentsComponent } from './../edit-payments/edit-payments.component';
import { NewPaymentsComponent } from './../new-payments/new-payments.component';
import { NewInvestorComponent } from './../new-investor/new-investor.component';
import { ApiResponse } from './../../../services/api-response';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatDialog, MatDialogConfig, MatSnackBar, MatTable } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  paymentList = [];
  investorsList: any;
  statistics: any;
  preloader: boolean = true;
  page: number = 0;
  loadMoreExist: boolean = true;

  displayedColumns2: string[] = ['id', 'investor',  'type', 'amount', 'date','action'];
  @ViewChild('filter_from', { read: MatInput }) filter_from: MatInput;
  @ViewChild('filter_to', { read: MatInput }) filter_to: MatInput;
  @ViewChild('filter_investor') filter_investor: any;
  @ViewChild(MatTable) table: MatTable<any>;
  // @ViewChild('filter_orderBy') filter_orderBy: any;
  // @ViewChild('filter_orderDir') filter_orderDir: any;


  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // this.flterFromValue = new Date();
    this.apiService.getInvestors().subscribe((res: ApiResponse) => {
      if ( res.status ){ this.investorsList =  res.data; }
     });
    this.loadData();
  }



  loadData(){
    this.preloader = true;
    const filterData = {
      filter_from: this.filter_from.value,
      filter_to:  this.filter_to.value,
      filter_investor:  this.filter_investor.value,
      // filter_orderBy: this.filter_orderBy.value,
      // filter_orderDir: this.filter_orderDir.value,
      page: this.page
    };

    console.log(' filterData ',  filterData );
    this.apiService.getPayments(filterData).subscribe((resp) => {
      console.log(' getSale ', resp );
      this.preloader = false;
      this.paymentList = [...this.paymentList, ...resp.data.list];
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
        this.apiService.DeletePayment(pid).subscribe((resp) => {
          console.log(' DeletePayment ', resp );
          if(resp.status){
            this.paymentList = this.paymentList;
            this.paymentList = this.paymentList.filter(p => p.id != pid);
            this._snackBar.open('Payment Deleted', '', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        });
      }
    });
  }

  editItem(id){
    // this.router.navigate(['sale/edit',id]);
  }

  searchData(){
    this.paymentList = [];  this.statistics = ''; this.page = 0;
    this.loadData();
  }

  resetFilter(){
    this.paymentList = [];
    this.statistics = '';
    this.page = 0;

   this.filter_from.value = '';
   this.filter_to.value = '';
   this.filter_investor.value = '';
   this.loadData();
  }


  AddNewInvestor() {
    console.log(' AddNewInvestor ');

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    dialogConfig.width = '300px';
    // dialogConfig.data = '';
    const dialogRef = this.dialog.open(NewInvestorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        console.log('dialog result ', result);
        // if (result.status === 'success') {
        //     window.parent.close();
        //     window.close();
        // }
    });

  }


  AddNewPayment() {
    console.log(' AddNewPayment ');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px';
    const dialogRef = this.dialog.open(NewPaymentsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        console.log('dialog AddNewPayment result ', result);
        if (result.status) {
          console.log('  result ', result.data);
          this.paymentList = [result.data, ...this.paymentList];
        }
    });

  }


  EditPayment(paymentData) {
    console.log(' EditPayment ', paymentData);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px';
    dialogConfig.data = paymentData;
    const dialogRef = this.dialog.open(EditPaymentsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        console.log('dialog EditPaymentsComponent result.data ', result.data);
        if (result && result.status) {
          console.log('  result ', result.data);
          let itemIndex = this.paymentList.findIndex(item => item.id == result.data.id);
          console.log(' itemIndex ', itemIndex, this.paymentList );

          this.paymentList[itemIndex] = result.data;
          this.table.renderRows();


          console.log(' result.data ', result.data, this.paymentList );

        }
    });
  }

}
