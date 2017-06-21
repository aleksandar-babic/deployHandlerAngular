import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'dashboard.cpu_usage',
        stats: '57,820',
        icon: 'cpu',
      }, {
        color: pieColor,
        description: 'dashboard.ram_usage',
        stats: '$ 89,745',
        icon: 'ram',
      }, {
        color: pieColor,
        description: 'dashboard.user_apps',
        stats: '178,391',
        icon: 'apps',
      }, {
        color: pieColor,
        description: 'dashboard.user_started_apps',
        stats: '32,592',
        icon: 'runningApps',
      }
    ];
  }
}
