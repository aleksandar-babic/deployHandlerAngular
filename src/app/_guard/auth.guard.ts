import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../theme/services/authService/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private toastrService: ToastrService, private authService: AuthService) { }


  canActivate() {
    // Token and userId are set, token is valid, everything looks good, let user pass auth guard
    if (localStorage.getItem('token') && localStorage.getItem('userId') && tokenNotExpired()) {
      return true;
    }

    //Token and userId are set, but token is not valid, redirect to login page and send notification
    if(localStorage.getItem('token') && localStorage.getItem('userId') && !tokenNotExpired()){
      this.toastrService.warning('Your secure token expired. (Token is valid for 20 minutes)','Token expired');
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }

    // Token or userId are not set, redirect to login page and send notification
    this.toastrService.info('Make sure that you are logged in in order to see this page.','Hint');
    this.router.navigate(['/login']);
    return false;
  }
}
