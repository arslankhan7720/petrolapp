import { User } from './../services/user';
import { ApiService } from './../services/api.service';
import { FirebaseService } from './../services/firebase.service';
// import { User } from './user.model';
// import { PayloadService } from './../services/payload.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error;
  // errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit() {

    // const currentUser = this.payLoadSvc.currentUserValue;
    // if (currentUser) {
    //     // if user already login then logout
    //     this.payLoadSvc.logout();
    // }

    // login form validatin dacleration
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  }


   // convenience getter for easy access to form fields
   get f() { return this.loginForm.controls; }


  // function triggered when user click on submit button.
   onLoginSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { return; }
    this.loading = true;

    console.log('onLoginSubmit  ', this.f.username.value, this.f.password.value);

    // this.firebaseService.SignIn(this.f.username.value, this.f.password.value).then((result) => {
    //   console.log(' result them ', result);
    //   this.router.navigateByUrl('/home');
    //   return result;
    // }).catch((error) => {
    //   this.loading = false;
    //   console.log(' result error ', error);
    //   this.error = error.message;
    // });

    this.apiService.login(this.f.username.value, this.f.password.value).subscribe((user: User) => {
      this.loading = false;
      console.log(' login api ', user);
    },
    (errorData) => {
      this.loading = false;
      console.log(' error while login  ', errorData );
      this.error = errorData.error;
    });



  }

}
