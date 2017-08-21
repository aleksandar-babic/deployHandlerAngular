import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { tokenNotExpired } from 'angular2-jwt';

import { User } from "./user.model";

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://api.deployhandler.com/api/users', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://api.deployhandler.com/api/users/login', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  changePassword(passwordGroup: Object){
    const body = JSON.stringify(passwordGroup);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('https://api.deployhandler.com/api/users/changepw' + token, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  forgotPasswordEmail(usernameEmail: Object){
    const body = JSON.stringify(usernameEmail);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://api.deployhandler.com/api/users/forgotpw', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  forgotPasswordAction(passwordsGroup: Object,token: string){
    const body = JSON.stringify(passwordsGroup);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('https://api.deployhandler.com/api/users/forgotpwaction?token=' + token, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  closeAccount(){
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete('https://api.deployhandler.com/api/users/close-account' + token)
      .map((response: Response) =>response.json())
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  logout() {
    localStorage.clear();
  }


  isLoggedIn() {
    return tokenNotExpired();
  }
}
