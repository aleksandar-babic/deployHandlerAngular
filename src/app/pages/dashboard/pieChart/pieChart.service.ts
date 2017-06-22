import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider,private http: Http) {
  }


  getStats() {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get('http://deployhandler.com:3000/api/stats' + token)
      .map((response: Response) => {
        const stats = response.json();
        return stats;
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    this.getStats().subscribe(data => {

    });
    return [
      {
        color: pieColor,
        description: 'dashboard.cpu_usage',
        stats: '0.08',
        icon: 'cpu',
      }, {
        color: pieColor,
        description: 'dashboard.ram_usage',
        stats: '2048MB',
        icon: 'ram',
      }, {
        color: pieColor,
        description: 'dashboard.user_apps',
        stats: '0',
        icon: 'apps',
      }, {
        color: pieColor,
        description: 'dashboard.user_started_apps',
        stats: '0',
        icon: 'runningApps',
      }
    ];
  }
}
