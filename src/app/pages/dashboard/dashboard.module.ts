import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { PieChart } from './pieChart';
import { PieChartService } from './pieChart/pieChart.service';
import { TodoComponent } from './todo';
import { TodoService } from './todo/todo.service';
import {SmartTablesService} from "./appsTable/appTable";
import {AppsTable} from "./appsTable/appTable.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    Ng2SmartTableModule,
    NgaModule,
    routing
  ],
  declarations: [
    PieChart,
    TodoComponent,
    AppsTable,
    Dashboard
  ],
  providers: [
    PieChartService,
    TodoService,
    SmartTablesService
  ]
})
export class DashboardModule {}
