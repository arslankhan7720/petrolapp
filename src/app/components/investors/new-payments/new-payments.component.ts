import { MatSnackBar, MatDialogRef } from '@angular/material';
import { ApiResponse } from './../../../services/api-response';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-payments',
  templateUrl: './new-payments.component.html',
  styleUrls: ['./new-payments.component.css']
})
export class NewPaymentsComponent implements OnInit {

  newForm: FormGroup;
  investorsList: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewPaymentsComponent>
    ) { }

  ngOnInit() {
    this.createForm();
    this.apiService.getInvestors().subscribe((res: ApiResponse) => {
      if ( res.status ){ this.investorsList =  res.data; }
     });
  }

  get f() { return this.newForm.controls; }

  createForm() {
    this.newForm = this.fb.group({
      type: ['', Validators.required ],
      amount: ['', Validators.required],
      investor_id: ['', Validators.required],
    });
  }

  submitData() {
    console.log(' submitData ', this.newForm.value);
    this.apiService.createPayment(this.newForm.value).subscribe((res: ApiResponse) => {
      console.log(' createPayment res ', res);
      if ( res.status ){
        this._snackBar.open('New Payment Added Succesfully', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
      this.dialogRef.close(res);
     });
  }

}
