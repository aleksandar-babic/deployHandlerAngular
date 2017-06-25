import {Component} from '@angular/core';
import {AppsService} from "../../../theme/services/appsService/apps.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'hover-table',
  templateUrl: './hoverTable.html'
})
export class HoverTable {

  tableData:Array<any>;

  constructor(private appsService: AppsService, private toastrService: ToastrService) {
    this.tableData = this.appsService.getAppsArray();
  }

  onStart(appId){
    this.appsService.startApp(appId)
      .subscribe(
        data => {
          this.toastrService.success('App ' + ' has been started.','Good job!');
          console.log(data);
          this.tableData = this.appsService.getAppsArray();
        },
        error => {
          this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
        }
      );
  }
  onStop(appId){
    this.appsService.stopApp(appId)
      .subscribe(
        data => {
          this.toastrService.success('App ' + ' has been stopped.','Good job!');
          console.log(data);
          this.tableData = this.appsService.getAppsArray();
        },
        error => {
          this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
        }
      );
  }
  onModify(appId){
    console.log('okaay');
  }
}
