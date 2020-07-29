import { ApiService } from 'src/app/services/api.service';
import { NewPaymentsComponent } from './../new-payments/new-payments.component';
import { NewInvestorComponent } from './../new-investor/new-investor.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatInput } from '@angular/material';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.css']
})
export class InvestorsComponent implements OnInit {



  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
    ) { }

  ngOnInit() {
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
        console.log('dialog result ', result);
        // if (result.status === 'success') {
        //     window.parent.close();
        //     window.close();
        // }
    });

  }





}
