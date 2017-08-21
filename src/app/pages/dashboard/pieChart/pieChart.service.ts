import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {Chart} from "./pieChart.model";

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider,private http: Http) {}

  getStats() {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return this.http.get('https://api.deployhandler.com/api/stats' + token)
      .map((response: Response) =>{
        let data = response.json();
        let statsArray = [
          {
            color: pieColor,
            description: 'dashboard.cpu_usage',
            stats: data.cpu.load,
            icon: 'cpu',
            usage: data.cpu.usage
          }, {
            color: pieColor,
            description: 'dashboard.ram_usage',
            stats: data.ram.total-data.ram.free + 'MB',
            icon: 'ram',
            usage: data.ram.usage
          }, {
            color: pieColor,
            description: 'dashboard.user_apps',
            stats: data.apps.total,
            icon: 'apps',
          }, {
            color: pieColor,
            description: 'dashboard.user_started_apps',
            stats: data.apps.running,
            icon: 'runningApps',
          }
        ];
        return statsArray;
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }

  getInitData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    let chartsArray : Array<Chart>;
    chartsArray = [
      {
        color: pieColor,
        description: 'dashboard.cpu_usage',
        stats: 'Loading',
        icon: 'cpu',
      }, {
        color: pieColor,
        description: 'dashboard.ram_usage',
        stats: 'Loading',
        icon: 'ram',
      }, {
        color: pieColor,
        description: 'dashboard.user_apps',
        stats: 'Loading',
        icon: 'apps',
      }, {
        color: pieColor,
        description: 'dashboard.user_started_apps',
        stats: 'Loading',
        icon: 'runningApps',
      }
    ];
    return chartsArray;
  }
}
