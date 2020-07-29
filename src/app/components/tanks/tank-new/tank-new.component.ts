import { ApiResponse } from 'src/app/services/api-response';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';



@Component({
  selector: 'app-tank-new',
  templateUrl: './tank-new.component.html',
  styleUrls: ['./tank-new.component.css']
})
export class TankNewComponent implements OnInit {

  newForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  get f() { return this.newForm.controls; }

  createForm() {
    this.newForm = this.fb.group({
      title: ['', Validators.required ],
      quantity: ['', Validators.required ],
    });
  }


  submitData() {
    console.log(' submitData ', this.newForm.value);
    this.apiService.createTank(this.newForm.value).subscribe((res: ApiResponse) => {
      console.log(' createTank res ', res);
      if ( res.status ){
        this._snackBar.open('New Stock Added Succesfully', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
       this.resetFields();
       this.router.navigate(['/tanks']);
     }
   );

   }



   resetFields() {
     this.newForm = this.fb.group({
       title: ['', Validators.required ],
       quantity: ['', Validators.required ],
     });
   }

}
