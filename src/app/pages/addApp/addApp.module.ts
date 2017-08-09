import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAppComponent } from './addApp.component';
import { routing } from './addApp.routing';

import {AddAppForm} from "./addAppForm/addAppForm.component";
import {NgaModule} from "../../theme/nga.module";

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    AngularFormsModule,
    ReactiveFormsModule,
    routing
  ],
  declarations: [
    AddAppComponent,
    AddAppForm
  ]
})
export class AddAppModule {}
