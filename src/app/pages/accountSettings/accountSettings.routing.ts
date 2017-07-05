import { Routes, RouterModule } from '@angular/router';

import { AccountSettingsComponent } from './accountSettings.component';

const routes: Routes = [
  {
    path: '',
    component: AccountSettingsComponent
  }
];

export const routing = RouterModule.forChild(routes);
