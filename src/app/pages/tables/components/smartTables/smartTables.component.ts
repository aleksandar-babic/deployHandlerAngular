import { Component } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import {AppsService} from "../../../../theme/services/appsService/apps.service";
import {App} from "../../../../theme/services/appsService/apps.model";


@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  query: string = '';

  settings = {
    /*actions:{
      add:false
    },*/
    add: {
      addButtonContent: '<i class="ion-ios-plus-outline"></i>',
      createButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string'
      },
      entryPoint: {
        title: 'Entry point',
        type: 'string'
      },
      port: {
        title: 'Port',
        type: 'number'
      },
      status: {
        title: 'Status',
        type: 'string',
        editable: false
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SmartTablesService, public appsService: AppsService, public toastrService: ToastrService) {
    this.getApps();
  }

  getApps(){
    this.appsService.getApps().subscribe((apps: App[]) => {
      this.source.load(apps);
    }, error => this.toastrService.warning('Error while getting list of your apps','Oh no.'));
  }

  onCreateConfirm(event): void{
      const app = new App(event.newData.name,event.newData.entryPoint,event.newData.port);
      this.appsService.addApp(app)
        .subscribe(
          data => {
            event.confirm.resolve();
            this.getApps();
            this.toastrService.success('App ' + app.name + ' has been added.','Good job!');
          },
          error => {
            this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
            event.confirm.reject();
          }
        );
  }
  onEditConfirm(event):void {
    this.appsService.editApp(event.newData)
      .subscribe(
        data => {
          event.confirm.resolve();
          this.toastrService.success('App ' + data.name + ' has been edited.','Done!');
          event.confirm.resolve();
        },
        error => {
          this.toastrService.warning(error.message,'Oh no.');
          event.confirm.reject();
        }
      );
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.appsService.deleteApp(event.data)
        .subscribe(
          data => {
            this.toastrService.success('App ' + event.data.name + ' has been Deleted.','Done!');
            event.confirm.resolve();
          },
          error => {
            this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
            event.confirm.reject();
          }
        );
    } else {
      event.confirm.reject();
    }
  }
}
