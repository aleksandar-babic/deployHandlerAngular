import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import {User} from "../../theme/services/authService/user.model";
import {AuthService} from "../../theme/services/authService/auth.service";
import {BaThemeSpinner} from "../../theme/services/baThemeSpinner/baThemeSpinner.service";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder, private authService: AuthService,private _spinner: BaThemeSpinner, private router: Router,private toastrService: ToastrService) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:any):void {
    this.submitted = true;
    this._spinner.show();
    if (this.form.valid) {
      const user = new User(values.username.toLowerCase(), values.password);
      this.authService.signin(user)
        .subscribe(
          data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            this.router.navigateByUrl('/');
            this._spinner.hide();
            this.toastrService.info('I\'m glad to see you again!','Hi there, ' + values.username + '.');
          },
          error =>{
            this.toastrService.error(error.message,'Error')
            this._spinner.hide();
          }
        );
    }
  }

  ngOnInit(){
    if(this.authService.isLoggedIn())
      this.router.navigateByUrl('/');
  }

}
