import {Component} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import {User} from "../../theme/services/authService/user.model";
import {AuthService} from "../../theme/services/authService/auth.service";
import {EmailValidator} from "../../theme/validators/email.validator";

@Component({
  selector: 'forgotpw',
  templateUrl: './forgotpw.html',
  styleUrls: ['./forgotpw.scss']
})
export class ForgotPw {

  public form:FormGroup;
  public username:AbstractControl;
  public email:AbstractControl;
  public submitted: boolean = false;

  constructor(fb:FormBuilder, private authService: AuthService, private router: Router,private route: ActivatedRoute,private toastrService: ToastrService) {
    this.form = fb.group({
      'username': ['', [this.checkUsername]],
      'email': ['', [this.checkEmail]]
    });

    this.username = this.form.controls['username'];
    this.email = this.form.controls['email'];
  }

  //TODO Work on these validations, same problem as with issues #16902 and #16276 on Angular github
  checkUsername(control: AbstractControl){
    if(control.dirty && control.value !== '') {
      control.setValidators([Validators.minLength(4)]);
    }
  }

  checkEmail(control: AbstractControl){
    if(control.dirty && control.value !== '') {
      control.setValidators([EmailValidator.validate]);
    }
  }

  public onSubmit(values:any):void {
    this.submitted = true;
    if (this.form.valid) {
      const usernameEmail = {
        'username':values.username.toLowerCase(),
        'email': values.email
      };
      this.authService.forgotPasswordEmail(usernameEmail)
        .subscribe(
          data => {
            this.router.navigateByUrl('/login');
            this.toastrService.success(data.message,'Success');
            this.form.reset({});
          },
          error =>{
            this.toastrService.error(JSON.parse(error._body).message,'Ooops..');
          }
        );
    }
  }

  ngOnInit(){
    if(this.authService.isLoggedIn())
      this.router.navigateByUrl('/');
  }

}
