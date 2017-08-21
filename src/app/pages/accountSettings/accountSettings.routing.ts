import { Routes, RouterModule } from '@angular/router';

import { AccountSettingsComponent } from './accountSettings.component';
import {AuthGuard} from "../../_guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forChild(routes);
