import { Routes, RouterModule }  from '@angular/router';

import { ForgotPw } from './forgotpw.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: ForgotPw
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
