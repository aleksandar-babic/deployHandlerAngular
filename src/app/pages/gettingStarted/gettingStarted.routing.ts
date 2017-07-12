import { Routes, RouterModule } from '@angular/router';

import {GettingStartedComponent} from "./gettingStarted.component";

const routes: Routes = [
  {
    path: '',
    component: GettingStartedComponent
  }
];

export const routing = RouterModule.forChild(routes);
