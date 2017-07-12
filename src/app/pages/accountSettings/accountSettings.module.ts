import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import {routing} from "./accountSettings.routing";
import {AccountSettingsComponent} from "./accountSettings.component";
import {NgaModule} from "../../theme/nga.module";
import {TodoService} from "../dashboard/todo/todo.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    AccountSettingsComponent
  ],
  providers: [
    TodoService
  ]
})
export class AccountSettingsModule {}
