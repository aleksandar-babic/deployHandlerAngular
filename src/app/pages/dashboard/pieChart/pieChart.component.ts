import {Component} from '@angular/core';

import {PieChartService} from './pieChart.service';

import 'easy-pie-chart/dist/jquery.easypiechart.js';

import {App} from "../../../theme/services/appsService/apps.model";
import {BaThemeConfigProvider} from "../../../theme/theme.configProvider";
import {StatsService} from "../../../theme/services/statsService/stats.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss']
})
// TODO: move easypiechart to component
export class PieChart {

  public charts: Array<Object>;
  private _init = false;

  constructor(private _pieChartService: PieChartService,private _baConfig:BaThemeConfigProvider, private toastrService: ToastrService) {
    this.charts = this._pieChartService.getData();
/*    this._getStats(function (data) {
      this._loadPieCharts();
      console.log(data);
      this.charts = data;
    });*/
    setInterval(()=>{this._updatePieCharts();},1000);
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this._init = true;
    }
  }

  private _getStats(callback: (data: Array<Object>) => void){
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return this._pieChartService.getStats().subscribe(data => {
      let statsArray : Array<Object>= [
        {
          color: pieColor,
          description: 'dashboard.cpu_usage',
          stats: data.cpu.load,
          icon: 'cpu',
          id:'cpu'
        }, {
          color: pieColor,
          description: 'dashboard.ram_usage',
          stats: data.ram.total-data.ram.free + 'MB',
          icon: 'ram',
          id:'ram'
        }, {
          color: pieColor,
          description: 'dashboard.user_apps',
          stats: data.apps.total,
          icon: 'apps',
          id:'totalApps'
        }, {
          color: pieColor,
          description: 'dashboard.user_started_apps',
          stats: data.apps.running,
          icon: 'runningApps',
          id:'runningApps'
        }
      ];
      callback(statsArray);
      //setInterval(()=>{this._updatePieCharts();},1000);
    }, error => {this.toastrService.warning('Error while fetching stats.','Oh no.'); callback([])});

  }



  private _loadPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }

  private _updatePieCharts() {

    jQuery('.pie-charts .chart').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(Math.random() * 100);
    });
  }
}
