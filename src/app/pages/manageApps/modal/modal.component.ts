import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AppsService} from "../../../theme/services/appsService/apps.service";
import {App} from "../../../theme/services/appsService/apps.model";
import {PortValidator, EntryPointValidator, AppNameValidator} from "../../../theme/validators";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./modal.component.scss')],
  templateUrl: 'modal.component.html'
})
//TODO Improve validation
export class Modal implements OnInit {

  modalAppIndex: number;
  modalHeader: string;
  modalContent: string;

  public form:FormGroup;
  public appName:AbstractControl;
  public appEntryPoint:AbstractControl;
  public appPort:AbstractControl;

  public localApp: App;
  public localNpmState: boolean;

  constructor(private fb:FormBuilder,private activeModal: NgbActiveModal, private appsService: AppsService, private toastrService: ToastrService) {}

  ngOnInit() {
    this.form = this.fb.group({
      'appName': ['', Validators.compose([AppNameValidator.validate])],
      'appEntryPoint': ['', Validators.compose([EntryPointValidator.validate])],
      'appPort': ['', Validators.compose([
        PortValidator.validate,
        Validators.minLength(3),
        Validators.maxLength(5),
      ])]
    });
    this.appName = this.form.controls['appName'];
    this.appEntryPoint = this.form.controls['appEntryPoint'];
    this.appPort = this.form.controls['appPort'];

    this.localApp = this.appsService.getAppsArray()[this.modalAppIndex];
    this.localNpmState = this.localApp.entryPoint.indexOf('npm.') !== -1;
    console.log(this.localNpmState);

  }

  closeModal() {
    this.activeModal.close();
  }

  //TODO Add NPM feature when editing app
  onSubmit(){
    if(this.form.value.appName)
      this.localApp.name = this.form.value.appName;
    if(this.form.value.appEntryPoint)
      this.localApp.entryPoint = this.form.value.appEntryPoint;
    if(this.form.value.appPort)
      this.localApp.port = this.form.value.appPort;
    if(!this.form.value.appPort && !this.form.value.appEntryPoint && !this.form.value.appName) {
      this.activeModal.close();
      return this.toastrService.info('You did not change anything.', 'No changes detected');
    }

    this.appsService.editApp(this.localApp)
      .subscribe(
        data => {
          this.toastrService.success('App ' + data.name + ' has been edited.','Done!');
          this.activeModal.close();
        },
        error => {
          this.toastrService.warning(error.message,'Oh no.');
        }
      );
  }
  onDelete(){
    if (window.confirm('Are you sure you want to delete?')) {
      this.appsService.deleteApp(this.localApp)
        .subscribe(
          data => {
            this.toastrService.success('App ' + this.localApp.name + ' has been Deleted.','Done!');
            this.activeModal.close();
          },
          error => {
            this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
          }
        );
    }
  }
}
