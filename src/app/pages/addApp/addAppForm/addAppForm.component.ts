import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {AppsService} from "../../../theme/services/appsService/apps.service";
import {PortValidator, EntryPointValidator,AppNameValidator} from "../../../theme/validators";

import {App} from "../../../theme/services/appsService/apps.model";


@Component({
  selector: 'basic-form',
  templateUrl: 'addAppForm.html',
  styles:[`
    .input-group-addon-primary{
      border-color: transparent;
    }
  `]
})
export class AddAppForm{

  public form:FormGroup;
  public appName:AbstractControl;
  public appNpmStart:AbstractControl;
  public appEntryPoint:AbstractControl;
  public appPort:AbstractControl;
  public npm:AbstractControl;
  public nginx:AbstractControl;
  isNpm: boolean = false;
  isNginx: boolean = true;

  constructor(fb:FormBuilder,private toastrService: ToastrService, private appsService: AppsService) {
    this.form = fb.group({
      'appName': ['', Validators.compose([Validators.required,AppNameValidator.validate])],
      'appEntryPoint': ['', Validators.compose([Validators.required,EntryPointValidator.validate])],
      'appPort': ['', Validators.compose([
        Validators.required,
        PortValidator.validate,
        Validators.minLength(3),
        Validators.maxLength(5),
      ])],
      'appNpmStart':['', Validators.compose([Validators.required])]
    });
    this.appNpmStart = this.form.controls['appNpmStart'];
    this.appName = this.form.controls['appName'];
    this.appEntryPoint = this.form.controls['appEntryPoint'];
    this.appPort = this.form.controls['appPort'];
    this.appNpmStart.disable();
  }

  setValidationForNpm(){
    if(!this.isNpm) {
      this.appEntryPoint.disable();
      this.appNpmStart.enable();
    }else{
      this.appEntryPoint.enable();
      this.appNpmStart.disable();
    }
  }

  onSubmit() {
    let app;
    if(!this.isNpm) {
      app = new App(this.form.value.appName, this.form.value.appEntryPoint, this.form.value.appPort);
    }
    else{
      app = new App(this.form.value.appName, this.form.value.appNpmStart, this.form.value.appPort,'','','','true');
    }
    this.appsService.addApp(app)
      .subscribe(
        data => {
          this.toastrService.success('App ' + app.name + ' has been added.','Good job!');
          app.status = 'stopped';
          this.appsService.getAppsArray().push(data);
        },
        error => {
          this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
        }
      );
    this.form.reset({
      appName: '',
      appEntryPoint: '',
      appPort: '',
      appNpmStart: ''
    });
  }

}
