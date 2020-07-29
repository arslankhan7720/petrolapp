import { ApiResponse } from '../../services/api-response';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../services/format-datepicker';

@Component({
  selector: 'app-new-purchase',
  templateUrl: './new-purchase.component.html',
  styleUrls: ['./new-purchase.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})

export class NewPurchaseComponent implements OnInit {

  newPurchaseForm: FormGroup;
  tanksList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
    this.apiService.getTanks().subscribe((res: ApiResponse) => {
      if ( res.status ){ this.tanksList =  res.data; }
     }
   );

  }


  createForm() {
    this.newPurchaseForm = this.fb.group({
      title: ['', Validators.required ],
      quantity: ['', Validators.required ],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      vehicle: ['', [Validators.required]],
      date: ['', Validators.required],
      tank_id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }



  submitData() {
    console.log(' submitData ', this.newPurchaseForm.value);
    this.apiService.createPruchase(this.newPurchaseForm.value).subscribe((res: ApiResponse) => {
      console.log(' createPruchase res ', res);
      if ( res.status ){
        this._snackBar.open('Purchase Added Succesfully', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
       this.resetFields();
       this.router.navigate(['/purchase']);
     }
   );

   }



   resetFields() {
     this.newPurchaseForm = this.fb.group({
       title: ['', Validators.required ],
       quantity: ['', Validators.required ],
       price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
       expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
       vehicle: ['', [Validators.required]],
       date: ['', Validators.required]
     });
   }


  get f() { return this.newPurchaseForm.controls; }

}
