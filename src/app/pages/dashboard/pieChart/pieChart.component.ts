import {Component} from '@angular/core';

import {PieChartService} from './pieChart.service';

import 'easy-pie-chart/dist/jquery.easypiechart.js';

import {BaThemeConfigProvider} from "../../../theme/theme.configProvider";
import {ToastrService} from "ngx-toastr";
import {Chart} from "./pieChart.model";


@Component({
  selector: 'pie-chart',
  templateUrl: './pieChart.html',
  styleUrls: ['./pieChart.scss']
})

export class PieChart {

  public charts: Array<Chart>;
  private _init = false;

  constructor(private _pieChartService: PieChartService,private _baConfig:BaThemeConfigProvider, private toastrService: ToastrService) {
    this.charts = this._pieChartService.getData();
    setInterval(()=>{this._getStats();},1000);
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._init = true;
    }
  }

  private _getStats(){
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    this._pieChartService.getStats().subscribe(data => {
      let statsArray : Array<Chart>= [
        {
          color: pieColor,
          description: 'dashboard.cpu_usage',
          stats: data.cpu.load,
          icon: 'cpu',
        }, {
          color: pieColor,
          description: 'dashboard.ram_usage',
          stats: data.ram.total-data.ram.free + 'MB',
          icon: 'ram',
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
      this.charts[0].stats = statsArray[0].stats;
      this.charts[1].stats = statsArray[1].stats;
      this.charts[2].stats = statsArray[2].stats;
      this.charts[3].stats = statsArray[3].stats;
      this._updatePieCharts(data.cpu.usage,data.ram.usage);
      return statsArray;
    }, error => {this.toastrService.warning('Error while fetching stats.','Oh no.');});

  }

  private _loadPieCharts() {

    jQuery('.chart').each(function (index) {
      let chart = jQuery(this);
      if(index==0)
        chart.attr('id','cpu');
      else if(index==1)
        chart.attr('id','ram');
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

  private _updatePieCharts(cpu,ram) {
    jQuery('#ram').data('easyPieChart').update(ram);
    jQuery('#cpu').data('easyPieChart').update(cpu);
  }
}
