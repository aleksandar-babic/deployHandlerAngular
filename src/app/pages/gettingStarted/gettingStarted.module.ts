import { NgModule }      from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import {GettingStartedComponent} from "./gettingStarted.component";
import { routing } from './gettingStarted.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    GettingStartedComponent
  ]
})
export class GettingStartedModule {}
