import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';

import {ManageAppsComponent} from "./manageApps.component";
import {routing} from "./manageApps.routing";
import {HoverTable} from "./hoverTable/hoverTable.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [
    ManageAppsComponent,
    HoverTable
  ]
})
export class ManageAppsModule {}
