import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../../services/api-response';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../services/format-datepicker';

@Component({
  selector: 'app-edit-sale',
  templateUrl: './edit-sale.component.html',
  styleUrls: ['./edit-sale.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class EditSaleComponent implements OnInit {

  SaleForm: FormGroup;
  SaleData: any;
  _saleId: number;
  tanksList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private _snackBar: MatSnackBar) { }

    get f() { return this.SaleForm.controls; }

  ngOnInit() {

    this._saleId = this.route.snapshot.params['id'];
    this.apiService.getTanks().subscribe((res: ApiResponse) => {
      if ( res.status ){ this.tanksList =  res.data; }
    });
    this.apiService.getSaleDetail(this._saleId).subscribe((res: ApiResponse) => {
      console.log(' getSaleDetail ', res);
      if(res.status){
        this.SaleData = res.data;
        this.SaleForm.patchValue(this.SaleData);
        this.SaleForm.get('date').patchValue(new Date(this.SaleData.date));
      }
    });

    this.createForm();
  }



  createForm() {
    this.SaleForm = this.fb.group({
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
    console.log(' submitData ', this.SaleForm.value);
    this.apiService.UpdateSale(this._saleId,this.SaleForm.value).subscribe((res: ApiResponse) => {
      console.log(' UpdateSale res ', res);
      if ( res.status ){
        this._snackBar.open('Sale Update Succesfully', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.resetFields();
       this.router.navigate(['/sale']);
      }else{
        this._snackBar.open(res.message, '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
     }
   );

   }


   resetFields() {
    this.SaleForm = this.fb.group({
      title: ['', Validators.required ],
      quantity: ['', Validators.required ],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      vehicle: ['', [Validators.required]],
      date: ['', Validators.required]
    });
  }






}
