import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from "ngx-toastr";

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

  constructor(fb:FormBuilder,private toastrService: ToastrService) {
    this.form = fb.group({
      'appName': ['', Validators.compose([Validators.required])],
      'appEntryPoint': ['', Validators.compose([Validators.required])],
      'appPort': ['', Validators.required],
      'npm': ['', Validators.required],
      'nginx': ['', Validators.required]
    });
    this.appName = this.form.controls['appName'];
    this.appEntryPoint = this.form.controls['appEntryPoint'];
    this.appPort = this.form.controls['appPort'];
    this.npm = this.form.controls['npm'];
    this.nginx = this.form.controls['nginx'];
  }
}
