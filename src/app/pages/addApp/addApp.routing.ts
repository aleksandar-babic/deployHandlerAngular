import { Routes, RouterModule } from '@angular/router';

import { AddAppComponent } from './addApp.component';

const routes: Routes = [
  {
    path: '',
    component: AddAppComponent
  }
];

export const routing = RouterModule.forChild(routes);
