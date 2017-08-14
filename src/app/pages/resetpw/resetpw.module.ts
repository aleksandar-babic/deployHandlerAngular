import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AppTranslationModule} from "../../app.translation.module";
import { NgaModule } from '../../theme/nga.module';

import { ResetPw } from './resetpw.component';
import { routing }       from './resetpw.routing';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    ResetPw
  ]
})
export class ResetPwModule {}
