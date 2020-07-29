import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiResponse } from './../../../services/api-response';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.component.html',
  styleUrls: ['./new-expense.component.css']
})
export class NewExpenseComponent implements OnInit {

  newForm: FormGroup;
  investorsList: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public expenseData: any,
    public dialogRef: MatDialogRef<NewExpenseComponent>
    ) { }

  ngOnInit() {
    this.createForm();
    if(this.expenseData){
      console.log(' Editing expenseData ', this.expenseData);
      this.newForm.patchValue(this.expenseData);
    }
    this.apiService.getInvestors().subscribe((res: ApiResponse) => {
      if ( res.status ){ this.investorsList =  res.data; }
     });
  }

  get f() { return this.newForm.controls; }

  createForm() {
    this.newForm = this.fb.group({
      id: [''],
      title: ['', Validators.required ],
      amount: ['', Validators.required],
      investor_id: ['', Validators.required],
    });
  }


  submitData() {
    console.log(' submitData ', this.newForm.value);
    this.apiService.createExpense(this.newForm.value).subscribe((res: ApiResponse) => {
      console.log(' createExpense res ', res);
      if ( res.status ){
        this._snackBar.open(res.message, '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
      this.dialogRef.close(res);
     });
  }

}

