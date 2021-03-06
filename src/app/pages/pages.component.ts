import { Component } from '@angular/core';
import { Routes } from '@angular/router';

import { BaMenuService } from '../theme';
import { PAGES_MENU } from './pages.menu';

@Component({
  selector: 'pages',
  template: `
    <ba-sidebar></ba-sidebar>
    <ba-page-top></ba-page-top>
    <div class="al-main">
      <div class="al-content">
        <ba-content-top></ba-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right" translate>{{'general.created_with'}} <i class="ion-heart"></i> and JavaScript.</div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="https://aleksandar.alfa-ing.com" translate target="_blank">{{'general.author'}}</a> 2017</div>
        <ul class="al-share clearfix">
          <li><a href="https://www.linkedin.com/in/aleksandar-babi%C4%87-45a862131/" target="_blank"><i class="socicon socicon-linkedin"></i></a></li>
          <li><a href="https://github.com/aleksandar-babic" target="_blank"><i class="socicon socicon-github"></i></a></li>
        </ul>
      </div>
    </footer>
    <ba-back-top position="200"></ba-back-top>
    `
})
export class Pages {

  constructor(private _menuService: BaMenuService,) {
  }

  ngOnInit() {
    this._menuService.updateMenuByRoutes(<Routes>PAGES_MENU);
  }
}
