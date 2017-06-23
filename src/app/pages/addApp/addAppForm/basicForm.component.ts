import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";
import {AppsService} from "../../../theme/services/appsService/apps.service";
import {App} from "../../../theme/services/appsService/apps.model";


@Component({
  selector: 'basic-form',
  templateUrl: './basicForm.html',
})
export class BasicForm {

  public form:FormGroup;
  public appName:AbstractControl;
  public appEntryPoint:AbstractControl;
  public appPort:AbstractControl;
  public npm:AbstractControl;
  public nginx:AbstractControl;
  isNpm: boolean = true;
  isNginx: boolean = true;

  constructor(fb:FormBuilder,private toastrService: ToastrService, private appsService: AppsService) {
    this.form = fb.group({
      'appName': ['', Validators.compose([Validators.required])],
      'appEntryPoint': ['', Validators.compose([Validators.required])],
      'appPort': ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5),
      ])],
      'npm': ['', Validators.required],
      'nginx': ['', Validators.required]
    });
    this.appName = this.form.controls['appName'];
    this.appEntryPoint = this.form.controls['appEntryPoint'];
    this.appPort = this.form.controls['appPort'];
    this.npm = this.form.controls['npm'];
    this.nginx = this.form.controls['nginx'];
  }

  onSubmit() {
    const app = new App(this.form.value.appName,this.form.value.appEntryPoint,this.form.value.appPort);
    this.appsService.addApp(app)
      .subscribe(
        data => {
          this.toastrService.success('App ' + app.name + ' has been added.','Good job!');
          this.form.reset();
        },
        error => {
          this.toastrService.warning(JSON.parse(error._body).message,'Oh no.');
        }
      );
  }

}
