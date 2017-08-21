import { Routes, RouterModule } from '@angular/router';

import {GettingStartedComponent} from "./gettingStarted.component";
import {AuthGuard} from "../../_guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: GettingStartedComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forChild(routes);
