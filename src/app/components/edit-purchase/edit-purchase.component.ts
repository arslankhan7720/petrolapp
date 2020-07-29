import { Component, OnInit } from '@angular/core';
import { ApiResponse } from '../../services/api-response';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../services/format-datepicker';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class EditPurchaseComponent implements OnInit {

  PurchaseForm: FormGroup;
  PruchaseData: any;
  _purchaseId: number;
  tanksList: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private _snackBar: MatSnackBar) { }

    get f() { return this.PurchaseForm.controls; }

  ngOnInit() {

    this._purchaseId = this.route.snapshot.params['id'];
    this.apiService.getTanks().subscribe((res: ApiResponse) => {
      if ( res.status ){ this.tanksList =  res.data; }
    });
    this.apiService.getPurchaseDetail(this._purchaseId).subscribe((res: ApiResponse) => {
      console.log(' getPurchaseDetail ', res);
      if(res.status){
        this.PruchaseData = res.data;
        this.PurchaseForm.patchValue(this.PruchaseData);
        this.PurchaseForm.get('date').patchValue(new Date(this.PruchaseData.date));
      }
    });

    this.createForm();
  }



  createForm() {
    this.PurchaseForm = this.fb.group({
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
    console.log(' submitData ', this.PurchaseForm.value);
    this.apiService.UpdatePruchase(this._purchaseId,this.PurchaseForm.value).subscribe((res: ApiResponse) => {
      console.log(' createPruchase res ', res);
      if ( res.status ){
        this._snackBar.open('Purchase Update Succesfully', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.resetFields();
       this.router.navigate(['/purchase']);
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
    this.PurchaseForm = this.fb.group({
      title: ['', Validators.required ],
      quantity: ['', Validators.required ],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      vehicle: ['', [Validators.required]],
      date: ['', Validators.required]
    });
  }






}
