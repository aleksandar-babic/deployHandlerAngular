import { Component } from '@angular/core';

import {AppsService} from "../../theme/services/appsService/apps.service";

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

  private apps;

  constructor(private appsService: AppsService) {
    this.apps  = this.appsService.getAppsArray();//.map(function (app) { return app.name; });
  }

}
