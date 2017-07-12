import { Component } from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EqualPasswordsValidator} from '../../theme/validators';


import {AppsService} from "../../theme/services/appsService/apps.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../theme/services/authService/auth.service";
import {TodoService} from "../dashboard/todo/todo.service";
import {Router} from "@angular/router";

@Component({
  selector: 'account-settings',
  templateUrl: './accountSettings.html',
  styles:[`
    .stopped, .stopped:visited, .stopped:hover, .stopped:active {
      color: rgb(232, 86, 86);
    }
    .started, .started:visited, .started:hover, .started:active {
      color: rgb(144, 185, 0);
    }
    .section-left{
      padding-left: 12px;
    }
  `]
})
export class AccountSettingsComponent {

  public form:FormGroup;
  public currentPassword:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  private apps;

  constructor(fb:FormBuilder, private toastrService: ToastrService,private authService: AuthService,private appsService: AppsService,private todoService: TodoService, private router: Router) {
    this.appsService.getApps().subscribe((apps) => {
      this.apps = apps;
    }, error => this.toastrService.warning('Error while getting list of your app URLs','Oh no.'));

    this.form = fb.group({
      'currentPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.currentPassword = this.form.controls['currentPassword'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmitPw(values: any):void {
    if (this.form.valid) {
      const passwordGroup = {current: values.currentPassword, new: values.passwords.password};
      this.authService.changePassword(passwordGroup).subscribe(data => {
        this.toastrService.success('Your password has been changed','Done');
      }, error => {
        this.toastrService.error(JSON.parse(error._body).message,'Error');
      });
    }
  }

  public onWipeTodos(){
    this.todoService.wipeTodos().subscribe(data=>{
      this.toastrService.info('Todos are now wiped.','Success');
    },error=>{
      this.toastrService.error(JSON.parse(error._body).message,'Error');
    });
  }

  public onCloseAccount(){
    if(confirm('Are you absolutely sure that you want to delete your account? ALL data will be lost.')){
      this.authService.closeAccount().subscribe(data=>{
        this.toastrService.warning('We are really sad to see you go, but its your final decision.','Take care')
        this.authService.logout();
        this.router.navigateByUrl('/login');
      },error=>{
        this.toastrService.error(JSON.parse(error._body).message,'Error');
      });
    }else {
      this.toastrService.success('Anyways, you made right decision.','That was close!');
    }
  }

}
