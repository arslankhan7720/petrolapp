import { MatSnackBar } from '@angular/material';
import { ApiResponse } from './../../../services/api-response';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-sale',
  templateUrl: './new-sale.component.html',
  styleUrls: ['./new-sale.component.css']
})
export class NewSaleComponent implements OnInit {
  newSaleForm: FormGroup;
  tanksList: any;

  constructor(
    private fb: FormBuilder,
    // public dialog: MatDialog,
    private router: Router,
    private apiService: ApiService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createForm();
    this.apiService.getTanks().subscribe((res: ApiResponse) => {
      if ( res.status ){ this.tanksList =  res.data; }
     }
   );
  }

  createForm() {
    this.newSaleForm = this.fb.group({
      date: ['', Validators.required],
      subcont: ['', Validators.required ],
      voucher: ['', [Validators.required]],
      quantity: ['', Validators.required ],
      rate: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      tank_id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      advance: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],

      expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],

    });
  }

    // convenience getter for easy access to form fields.
    get f() { return this.newSaleForm.controls; }

    resetFields() {
      this.newSaleForm = this.fb.group({
        title: ['', Validators.required ],
        quantity: ['', Validators.required ],
        price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        vehicle: ['', [Validators.required]],
        date: ['', Validators.required]
      });
    }


    submitData() {
      // console.log(' submitData ', this.newSaleForm.value);
      this.apiService.createSale(this.newSaleForm.value).subscribe((res: ApiResponse) => {
        // console.log(' createPruchase res ', res);
        if ( res.status ){
          this._snackBar.open('Purchase Added Succesfully', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        }
         this.resetFields();
         this.router.navigate(['/sale']);
       }
     );

     }


}
