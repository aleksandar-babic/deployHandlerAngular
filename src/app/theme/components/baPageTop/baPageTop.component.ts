import {Component} from '@angular/core';
import {Router} from "@angular/router";
import * as screenfull from 'screenfull';
import {GlobalState} from '../../../global.state';

import {AuthService} from "../../services/authService/auth.service";

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;

  constructor(private _state:GlobalState, private authService: AuthService, private router: Router) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;

  }
  public requestFullScreen(){
    if (screenfull.enabled) {
      screenfull.toggle();
    }
    console.log("Toggle fullscreen");
  }

  public onLogout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
