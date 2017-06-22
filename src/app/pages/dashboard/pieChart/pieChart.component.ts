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
    this.charts = this._pieChartService.getInitData();
    setInterval(()=>{this._getStats();},1000);
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._init = true;
    }
  }

  private _getStats(){
    this._pieChartService.getStats().subscribe(data => {
      this.charts[0].stats = data[0].stats;
      this.charts[1].stats = data[1].stats;
      this.charts[2].stats = data[2].stats;
      this.charts[3].stats = data[3].stats;
      this._updatePieCharts(data[0].usage,data[1].usage);
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
    jQuery('#cpu').data('easyPieChart').update(cpu);
    jQuery('#ram').data('easyPieChart').update(ram);
  }
}
