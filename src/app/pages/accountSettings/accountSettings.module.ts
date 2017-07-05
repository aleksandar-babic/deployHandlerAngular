import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import {routing} from "./accountSettings.routing";
import {AccountSettingsComponent} from "./accountSettings.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    AccountSettingsComponent
  ]
})
export class AccountSettingsModule {}
