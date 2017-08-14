import {Component, OnInit} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator, UsernameValidator} from '../../theme/validators';
import {Router, ActivatedRoute, Params} from "@angular/router";


import {User} from "../../theme/services/authService/user.model";
import { tokenNotExpired } from 'angular2-jwt';
import {AuthService} from "../../theme/services/authService/auth.service";
import {ToastrService} from "ngx-toastr";
import {BaThemeSpinner} from "../../theme/services/baThemeSpinner/baThemeSpinner.service";

@Component({
  selector: 'resetpw',
  templateUrl: './resetpw.html',
  styleUrls: ['./resetpw.scss']
})
export class ResetPw implements OnInit{

  public form:FormGroup;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;
  private token: string;
  public validToken: boolean = false;

  constructor(fb:FormBuilder, private authService: AuthService, private _spinner: BaThemeSpinner, private toastrService: ToastrService, private router: Router,private activatedRoute: ActivatedRoute) {

    this.form = fb.group({
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  public onSubmit(values: any):void {
    this._spinner.show();
    this.submitted = true;
    if (this.form.valid) {
      console.log(values);
      let passwordsGroup = {
        password: values.passwords.password,
        password2: values.passwords.repeatPassword
      };

      this.authService.forgotPasswordAction(passwordsGroup,this.token).subscribe(
        data => {
          this.router.navigateByUrl('/login');
          this.toastrService.success(data.message,'Success');
          this.form.reset({});
          this._spinner.hide();
        },
        error =>{
          this.toastrService.error(JSON.parse(error._body).message,'Ooops..');
          this._spinner.hide();
        }
      );
    }
  }

  ngOnInit(){
    if(this.authService.isLoggedIn())
      this.router.navigateByUrl('/');

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if(params['token']) {
        localStorage.setItem('resetpwToken', params['token']);
        this.token = params['token'];
        this.validToken = tokenNotExpired('resetpwToken');
      }
    });


  }
}
