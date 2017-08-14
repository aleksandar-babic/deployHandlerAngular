import { Routes, RouterModule }  from '@angular/router';

import { ResetPw } from './resetpw.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: ResetPw
  }
];

export const routing = RouterModule.forChild(routes);
