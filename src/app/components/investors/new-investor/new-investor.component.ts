import { MatSnackBar, MatDialogRef } from '@angular/material';
import { ApiResponse } from './../../../services/api-response';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-investor',
  templateUrl: './new-investor.component.html',
  styleUrls: ['./new-investor.component.css']
})
export class NewInvestorComponent implements OnInit {

  newForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NewInvestorComponent>,
    private apiService: ApiService,
    private _snackBar: MatSnackBar
    ) { }

  ngOnInit() {
    this.createForm();

  }

  get f() { return this.newForm.controls; }

  createForm() {
    this.newForm = this.fb.group({
      name: ['', Validators.required ],
      amount: ['' ],
    });
  }


  submitData() {
    console.log(' submitData ', this.newForm.value);
    this.apiService.createInvestor(this.newForm.value).subscribe((res: ApiResponse) => {
      console.log(' createInvestor res ', res);
      if ( res.status ){
        this._snackBar.open('New Investor Added Succesfully', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.dialogRef.close(res);
      }

     });

  }

}
