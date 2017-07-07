import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import {routing} from "./accountSettings.routing";
import {AccountSettingsComponent} from "./accountSettings.component";
import {NgaModule} from "../../theme/nga.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    AccountSettingsComponent
  ]
})
export class AccountSettingsModule {}
