import { ApiResponse } from './../../../services/api-response';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-payments',
  templateUrl: './edit-payments.component.html',
  styleUrls: ['./edit-payments.component.css']
})
export class EditPaymentsComponent implements OnInit {

  PaymentForm: FormGroup;
  PaymentData: any;
  _Id: number;
  investorsList: any;

  constructor(
    private fb: FormBuilder,
    // private router: Router,
    // private route: ActivatedRoute,
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditPaymentsComponent>
    ) { }

    get f() { return this.PaymentForm.controls; }

  ngOnInit() {

    console.log(' this data ', this.data);

    this.apiService.getInvestors().subscribe((res: ApiResponse) => {
      if ( res.status ){ this.investorsList =  res.data; }
     });

    // this._Id = this.route.snapshot.params['id'];
    // this.apiService.getTanks().subscribe((res: ApiResponse) => {
    //   if ( res.status ){ this.tanksList =  res.data; }
    // });
    // this.apiService.getSaleDetail(this._Id).subscribe((res: ApiResponse) => {
    //   console.log(' getSaleDetail ', res);
    //   if(res.status){
    //     this.SaleData = res.data;
    //     this.PaymentForm.patchValue(this.SaleData);
    //     this.PaymentForm.get('date').patchValue(new Date(this.SaleData.date));
    //   }
    // });
    this.PaymentData = this.data;
    console.log(' this PaymentData ', this.PaymentData);
    // this.PaymentForm.get('date').patchValue(new Date(this.PaymentData.created_at));
    this.createForm();
    this.PaymentForm.patchValue(this.PaymentData);
  }



  createForm() {
    this.PaymentForm = this.fb.group({
      type: ['', Validators.required ],
      amount: ['', Validators.required],
      investor_id: ['', Validators.required],
    });
  }


  submitData() {
    console.log(' submitData ', this.PaymentForm.value);
    this.apiService.UpdatePayment(this.PaymentData.id,this.PaymentForm.value).subscribe((res: ApiResponse) => {
      console.log(' UpdatePayment res ', res);
      if ( res.status ){
        this._snackBar.open('Payment Update Succesfully', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.dialogRef.close(res);
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


  //  resetFields() {
  //   this.PaymentForm = this.fb.group({
  //     title: ['', Validators.required ],
  //     quantity: ['', Validators.required ],
  //     price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  //     expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
  //     vehicle: ['', [Validators.required]],
  //     date: ['', Validators.required]
  //   });

}
