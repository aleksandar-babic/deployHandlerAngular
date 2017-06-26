import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AppsService} from "../../../theme/services/appsService/apps.service";
import {App} from "../../../theme/services/appsService/apps.model";
import {PortValidator, EntryPointValidator} from "../../../theme/validators";


@Component({
  selector: 'add-service-modal',
  styleUrls: [('./modal.component.scss')],
  templateUrl: 'modal.component.html'
})

export class Modal implements OnInit {

  modalAppIndex: number;
  modalHeader: string;
  modalContent: string;

  public form:FormGroup;
  public appName:AbstractControl;
  public appEntryPoint:AbstractControl;
  public appPort:AbstractControl;

  public localApp: App;


  constructor(private fb:FormBuilder,private activeModal: NgbActiveModal, private appsService: AppsService) {}

  ngOnInit() {
    this.form = this.fb.group({
      'appName': ['', Validators.compose([])],
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
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit(){
    if(this.form.value.appName)
      this.localApp.name = this.form.value.appName;
    if(this.form.value.appEntryPoint)
      this.localApp.entryPoint = this.form.value.appEntryPoint;
    if(this.form.value.appPort)
      this.localApp.port = this.form.value.appPort;
  }
  onDelete(){}
}
