import {Component} from '@angular/core';
import {AppsService} from "../../../theme/services/appsService/apps.service";
import {ToastrService} from "ngx-toastr";
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import {Modal} from "../modal/modal.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'hover-table',
  templateUrl: './hoverTable.html',
  styles:[`
    td > input {
      background-color: transparent;
      border: 0;
      color:white;
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
          this.toastrService.success('App ' + ' has been started.','Good job!');
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
}
