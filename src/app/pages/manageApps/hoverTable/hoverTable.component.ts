import {Component} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AppsService} from "../../../theme/services/appsService/apps.service";
import {ToastrService} from "ngx-toastr";

import {Modal} from "../modal/modal.component";
import {ModalNpm} from "../modalNpm/modal.component";

@Component({
  selector: 'hover-table',
  templateUrl: './hoverTable.html',
  styles:[`
    td > input {
      background-color: transparent;
      border: 0;
      color:white;
    }
    .status-button{
      width: 70px;
    }
  `]
})
export class HoverTable {
  tableData:Array<any>;

  constructor(private appsService: AppsService, private toastrService: ToastrService, private modalService: NgbModal) {
    this.tableData = this.appsService.getAppsArray();
  }

  onStart(appId,i){
    this.toastrService.info('App is starting.','Give me a moment');
    this.appsService.startApp(appId)
      .subscribe(
        data => {
          this.toastrService.success('Now live on http:// ' + this.tableData[i].name +'.deployhandler.com','App has been started!');
          this.tableData[i].status = 'started';
        },
        error => {
          this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
        }
      );
  }
  onStop(appId,i){
    this.toastrService.info('App is stopping.','Give me a moment');
    this.appsService.stopApp(appId)
      .subscribe(
        data => {
          this.toastrService.success('App ' + ' has been stopped.','Good job!');
          this.tableData[i].status = 'stopped';
        },
        error => {
          this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
        }
      );
  }
  onModify(i){
    const activeModal = this.modalService.open(Modal, {size: 'lg'});
    activeModal.componentInstance.modalHeader = 'Modify ' + this.appsService.getAppsArray()[i].name;
    activeModal.componentInstance.modalAppIndex = i;
  }

  onNpmInstall(appId){
    this.toastrService.info('NPM install is started.','Give me a moment to install dependencies. Modal will be opened with output');
    const activeModal = this.modalService.open(ModalNpm, {size: 'lg'});
    activeModal.componentInstance.modalContent = ['Command is still running..'];
    this.appsService.installApp(appId)
      .subscribe(
        data => {
          if(data.output != '') {
            var outputArray = data.output.split('\n');
            outputArray.unshift('Output of command : ');
            activeModal.componentInstance.modalContent = outputArray;
          }
          else
            activeModal.componentInstance.modalContent = ['NPM install output is empty. This probably means that all your dependencies are already installed.'];
        },
        error => {
          this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
          console.log(JSON.parse(error._body).obj);
        }
      );


  }
}
