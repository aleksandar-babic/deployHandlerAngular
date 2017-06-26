import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {ManageAppsComponent} from "./manageApps.component";
import {routing} from "./manageApps.routing";

import {HoverTable} from "./hoverTable/hoverTable.component";
import {Modal} from "./modal/modal.component";
import {NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {NgaModule} from "../../theme/nga.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    NgbModalModule,
    routing
  ],
  declarations: [
    ManageAppsComponent,
    HoverTable,
    Modal
  ],entryComponents: [
    Modal
  ]
})
export class ManageAppsModule {}
