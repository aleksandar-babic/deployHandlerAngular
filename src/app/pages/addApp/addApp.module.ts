import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule as AngularFormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAppComponent } from './addApp.component';
import { routing } from './addApp.routing';

import {BasicForm} from "./addAppForm/basicForm.component";
import {NgaModule} from "../../theme/nga.module";
import {DefaultModal} from "./default-modal/default-modal.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    BasicForm,
    DefaultModal
  ],
  entryComponents: [
    DefaultModal
  ],
  providers: [
    NgbModal
  ]
})
export class AddAppModule {}
