import {Component} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, UsernameValidator} from '../../theme/validators';
import {Router} from "@angular/router";


import {User} from "../../theme/services/authService/user.model";
import {AuthService} from "../../theme/services/authService/auth.service";
import {ToastrService} from "ngx-toastr";
import {BaThemeSpinner} from "../../theme/services/baThemeSpinner/baThemeSpinner.service";

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  public form:FormGroup;
  public userName:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  constructor(fb:FormBuilder, private authService: AuthService,private _spinner: BaThemeSpinner, private toastrService: ToastrService, private router: Router) {

    this.form = fb.group({
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(4), UsernameValidator.validate])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.userName = this.form.controls['userName'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values: any):void {
    this.submitted = true;
    this._spinner.show();
    if (this.form.valid) {
      const user = new User(values.userName.toLowerCase(), values.passwords.password, values.email);
      this.authService.signup(user).subscribe(data => {
        this.toastrService.success('Give me a moment to log you in.','Great, you are now registrated.');
        this.authService.signin(user).subscribe(dataLogin => {
          localStorage.setItem('token', dataLogin.token);
          localStorage.setItem('userId', dataLogin.userId);
          this.router.navigateByUrl('/');
          this._spinner.hide();
          this.toastrService.info('This is our dashboard. You can find docs in Getting started menu item.','Welcome to deployHandler, ' + values.userName);
        }, errorLogin => {
          this.toastrService.error(errorLogin.message,'Error');
          this._spinner.hide();
        });
      }, error => {
        this.toastrService.error(error.message,'Error');
        this._spinner.hide();
      });
    }
  }

  ngOnInit(){
    if(this.authService.isLoggedIn())
      this.router.navigateByUrl('/');
  }
}
