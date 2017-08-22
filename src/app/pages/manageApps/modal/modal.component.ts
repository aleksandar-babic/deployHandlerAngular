import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AppsService} from "../../../theme/services/appsService/apps.service";
import {App} from "../../../theme/services/appsService/apps.model";
import {PortValidator, EntryPointValidator, AppNameValidator} from "../../../theme/validators";
import {ToastrService} from "ngx-toastr";
import {BaThemeSpinner} from "../../../theme/services/baThemeSpinner/baThemeSpinner.service";
declare var $:JQueryStatic;

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
  public localNpmState: boolean = false;
  public localTmpEntryPoint: string;
  public entryPointPlacehldr: string;

  constructor(private fb:FormBuilder,private activeModal: NgbActiveModal, private appsService: AppsService, private toastrService: ToastrService, private _spinner: BaThemeSpinner) {}

  ngOnInit() {
    this.form = this.fb.group({
      'appName': ['', Validators.compose([Validators.required,AppNameValidator.validate])],
      'appEntryPoint': ['', Validators.compose([Validators.required,EntryPointValidator.validate])],
      'appPort': ['', Validators.compose([
        Validators.required,
        PortValidator.validate,
        Validators.minLength(3),
        Validators.maxLength(5)
      ])]
    });
    this.appName = this.form.controls['appName'];
    this.appEntryPoint = this.form.controls['appEntryPoint'];
    this.appPort = this.form.controls['appPort'];

    this.localApp = this.appsService.getAppsArray()[this.modalAppIndex];
    this.localNpmState = this.localApp.entryPoint.indexOf('npm.') !== -1;
    if(this.localNpmState)
      this.form.controls['appEntryPoint'].setValidators([Validators.required]);
    else
      this.form.controls['appEntryPoint'].setValidators([Validators.required,EntryPointValidator.validate]);
    this.localTmpEntryPoint = (this.localNpmState)?this.localApp.entryPoint.split('.')[1]:this.localApp.entryPoint;

    //The UGLY UGLY UGLY workaround, will have to find something better, but it does work
    $(document).ready(function () {
      $('.modal-content').css('background-color','rgba(255, 255, 255, 0.85)');
      $('.animated.fadeIn.card.with-scroll.lists-widget.modalModfiy.card-blur').css('margin-bottom','0px');
      $('h3.card-title').css('color','#000');
      $('label.custom-checkbox > span').css('color','#191818');
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  setValidationForNpm(){
    if(!this.localNpmState) {
      this.form.controls['appEntryPoint'].setValidators([Validators.required]);
      this.entryPointPlacehldr = 'Example: start';
      this.localTmpEntryPoint = (this.localNpmState)?this.localApp.entryPoint.split('.')[1]:'';
    }else{
      this.form.controls['appEntryPoint'].setValidators([Validators.required,EntryPointValidator.validate]);
      this.entryPointPlacehldr = 'Example: app.js';
      this.localTmpEntryPoint = (!this.localNpmState)?this.localApp.entryPoint:'';
    }
  }


  onSubmit(){
    this._spinner.show();
    if(this.form.value.appName)
      this.localApp.name = this.form.value.appName;
    if(this.form.value.appEntryPoint) {
      if(this.localNpmState)
        this.localApp.entryPoint = 'npm.' + this.form.value.appEntryPoint;
      else
        this.localApp.entryPoint = this.form.value.appEntryPoint;
    }
    if(this.form.value.appPort)
      this.localApp.port = this.form.value.appPort;

    this.appsService.editApp(this.localApp)
      .subscribe(
        data => {
          this.activeModal.close();
          this._spinner.hide();
          this.toastrService.success('App ' + data.name + ' has been edited.','Done!');
        },
        error => {
          this._spinner.hide();
          this.toastrService.warning(error.message,'Oh no.');
        }
      );
  }
  onDelete(){
    if (window.confirm('Are you sure you want to delete?')) {
      this.activeModal.close();
      this._spinner.show();
      this.appsService.deleteApp(this.localApp)
        .subscribe(
          data => {
            this.toastrService.success('App ' + this.localApp.name + ' has been Deleted.','Done!');
            this._spinner.hide();
          },
          error => {
            this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
            this._spinner.hide();
          }
        );
    }
  }
}
