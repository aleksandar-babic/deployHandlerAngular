import { Routes, RouterModule } from '@angular/router';

import {ManageAppsComponent} from "./manageApps.component";
import {AuthGuard} from "../../_guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: ManageAppsComponent,
    canActivate: [AuthGuard]
  }
];

export const routing = RouterModule.forChild(routes);
