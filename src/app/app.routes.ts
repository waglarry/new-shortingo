import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { VerifyotpComponent } from './components/verifyotp/verifyotp.component';
import { CreatenewpasswordComponent } from './components/createnewpassword/createnewpassword.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetpasswordComponent },
  { path: 'verify-otp', component: VerifyotpComponent },
  { path: 'create-new-password', component: CreatenewpasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
