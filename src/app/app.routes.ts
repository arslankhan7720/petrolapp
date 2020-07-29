import { PaymentsComponent } from './components/investors/payments/payments.component';
import { InvestorsComponent } from './components/investors/investors/investors.component';
import { EditSaleComponent } from './components/sale/edit-sale/edit-sale.component';
import { TanksComponent } from './components/tanks/tanks/tanks.component';
import { TankEditComponent } from './components/tanks/tank-edit/tank-edit.component';
import { TankNewComponent } from './components/tanks/tank-new/tank-new.component';
import { EditPurchaseComponent } from './components/edit-purchase/edit-purchase.component';
import { NewPurchaseComponent } from './components/new-purchase/new-purchase.component';
import { PurchaseComponent } from './components/purchase/purchase.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { NewSaleComponent } from './components/sale/new-sale/new-sale.component';
import { SaleComponent } from './components/sale/sale/sale.component';
import { ExpensesComponent } from './components/expense/expenses/expenses.component';

export const rootRouterConfig: Routes = [
  { path: 'login' , component: LoginComponent},
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'new-user', component: NewUserComponent, canActivate: [AuthGuard] },
  { path: 'new-sale', component: NewSaleComponent, canActivate: [AuthGuard] },
  { path: 'details/:id', component: EditUserComponent, resolve: {data : EditUserResolver} },

  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'purchase/new', component: NewPurchaseComponent, canActivate: [AuthGuard] },
  { path: 'purchase/edit/:id', component: EditPurchaseComponent, canActivate: [AuthGuard] },

  { path: 'tanks', component: TanksComponent, canActivate: [AuthGuard] },
  { path: 'tanks/new', component: TankNewComponent, canActivate: [AuthGuard] },
  { path: 'tanks/edit/:id', component: TankEditComponent, canActivate: [AuthGuard] },


  { path: 'sale', component: SaleComponent, canActivate: [AuthGuard] },
  { path: 'sale/new', component: NewSaleComponent, canActivate: [AuthGuard] },
  { path: 'sale/edit/:id', component: EditSaleComponent, canActivate: [AuthGuard] },

  { path: 'investors', component: InvestorsComponent, canActivate: [AuthGuard] },
  { path: 'payments', component: PaymentsComponent, canActivate: [AuthGuard] },

  { path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard] },

];
