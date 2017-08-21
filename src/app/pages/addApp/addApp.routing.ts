import { Routes, RouterModule } from '@angular/router';

import { AddAppComponent } from './addApp.component';
import {AuthGuard} from "../../_guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AddAppComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forChild(routes);
