
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EditPurchaseComponent } from './components/edit-purchase/edit-purchase.component';
import { AppInterceptor } from './app.interceptors';
import { ApiService } from './services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule, MatNativeDateModule, MatSelectModule, MatExpansionModule, MatTableModule, MatCardModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';


import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { NewPurchaseComponent } from './components/new-purchase/new-purchase.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/services/format-datepicker';
import { DatePipe } from '@angular/common';
import { TanksComponent } from './components/tanks/tanks/tanks.component';
import { TankEditComponent } from './components/tanks/tank-edit/tank-edit.component';
import { TankNewComponent } from './components/tanks/tank-new/tank-new.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SaleComponent } from './components/sale/sale/sale.component';
import { EditSaleComponent } from './components/sale/edit-sale/edit-sale.component';
import { NewSaleComponent } from './components/sale/new-sale/new-sale.component';
import { InvestorsComponent } from './components/investors/investors/investors.component';
import { NewInvestorComponent } from './components/investors/new-investor/new-investor.component';
import { PaymentsComponent } from './components/investors/payments/payments.component';
import { NewPaymentsComponent } from './components/investors/new-payments/new-payments.component';
import { EditPaymentsComponent } from './components/investors/edit-payments/edit-payments.component';
import { ExpensesComponent } from './components/expense/expenses/expenses.component';
import { NewExpenseComponent } from './components/expense/new-expense/new-expense.component';
import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    AvatarDialogComponent,
    EditUserComponent,
    NewUserComponent,
    HomeComponent,
    LoginComponent,
    NewSaleComponent,
    PurchaseComponent,
    NewPurchaseComponent,
    EditPurchaseComponent,
    ConfirmDialogComponent,
    TanksComponent,
    TankEditComponent,
    TankNewComponent,
    SaleComponent,
    EditSaleComponent,
    InvestorsComponent,
    NewInvestorComponent,
    PaymentsComponent,
    NewPaymentsComponent,
    EditPaymentsComponent,
    ExpensesComponent,
    NewExpenseComponent
  ],
  entryComponents: [
    AvatarDialogComponent,
    ConfirmDialogComponent,
    NewInvestorComponent,
    NewPaymentsComponent,
    EditPaymentsComponent,
    NewExpenseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    FirebaseService,
    EditUserResolver,
    ApiService,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS},
    DatePipe
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
