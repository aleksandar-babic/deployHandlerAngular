import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import {AuthGuard} from "../_guard/auth.guard";
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'forgotpw',
    loadChildren: 'app/pages/forgotpw/forgotpw.module#ForgotPwModule'
  },
  {
    path: '',
    component: Pages,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'apps/add', loadChildren: './addApp/addApp.module#AddAppModule' },
      { path: 'apps/manage', loadChildren: './manageApps/manageApps.module#ManageAppsModule' },
      { path: 'settings', loadChildren: './accountSettings/accountSettings.module#AccountSettingsModule' },
      { path: 'help', loadChildren: './gettingStarted/gettingStarted.module#GettingStartedModule' }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
