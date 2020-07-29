import { NewExpenseComponent } from './../new-expense/new-expense.component';
import { ApiResponse } from './../../../services/api-response';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatInput, MatDialog, MatDialogConfig, MatSnackBar, MatTable } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  expensesList = [];
  investorsList: any;
  statistics: any;
  preloader: boolean = true;
  page: number = 0;
  loadMoreExist: boolean = true;

  displayedColumns2: string[] = ['id', 'investor',  'title', 'amount', 'date','action'];
  @ViewChild('filter_from', { read: MatInput }) filter_from: MatInput;
  @ViewChild('filter_to', { read: MatInput }) filter_to: MatInput;
  @ViewChild('filter_investor') filter_investor: any;
  @ViewChild('filter_title') filter_title: any;
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
      filter_title: this.filter_title.value,
      // filter_orderDir: this.filter_orderDir.value,
      page: this.page
    };

    console.log(' filterData ',  filterData );
    this.apiService.getExpenses(filterData).subscribe((resp) => {
      console.log(' getSale ', resp );
      this.preloader = false;
      this.expensesList = [...this.expensesList, ...resp.data.list];
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
        this.apiService.DeleteExpense(pid).subscribe((resp) => {
          console.log(' DeleteExpense ', resp );
          if(resp.status){
            this.expensesList = this.expensesList;
            this.expensesList = this.expensesList.filter(p => p.id != pid);
            this._snackBar.open('Expense Deleted', '', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          }
        });
      }
    });
  }



  searchData(){
    this.expensesList = [];  this.statistics = ''; this.page = 0;
    this.loadData();
  }

  resetFilter(){
    this.expensesList = [];
    this.statistics = '';
    this.page = 0;

   this.filter_from.value = '';
   this.filter_to.value = '';
   this.filter_investor.value = '';
   this.loadData();
  }





  AddNewExpense() {
    console.log(' AddNewExpense ');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px';
    const dialogRef = this.dialog.open(NewExpenseComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        console.log('dialog AddNewExpense result ', result);
        if (result.status) {
          console.log('  result ', result.data);
          this.expensesList = [result.data, ...this.expensesList];
        }
    });

  }


  EditExpense(expenseData) {
    console.log(' EditExpense ', expenseData);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '300px';
    dialogConfig.data = expenseData;
    const dialogRef = this.dialog.open(NewExpenseComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        console.log('dialog EditPaymentsComponent result.data ', result.data);
        if (result && result.status) {
          console.log('  result ', result.data);
          let itemIndex = this.expensesList.findIndex(item => item.id == result.data.id);
          console.log(' itemIndex ', itemIndex, this.expensesList );

          this.expensesList[itemIndex] = result.data;
          this.table.renderRows();


          console.log(' result.data ', result.data, this.expensesList );

        }
    });
  }

}
