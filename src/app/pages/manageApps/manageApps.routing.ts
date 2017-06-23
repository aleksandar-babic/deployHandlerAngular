import { Routes, RouterModule } from '@angular/router';

import {ManageAppsComponent} from "./manageApps.component";

const routes: Routes = [
  {
    path: '',
    component: ManageAppsComponent
  }
];

export const routing = RouterModule.forChild(routes);
