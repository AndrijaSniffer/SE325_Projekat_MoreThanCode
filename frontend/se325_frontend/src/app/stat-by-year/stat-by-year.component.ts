import {Component, OnInit} from '@angular/core';
import {StatByYear} from "../classes/stat-by-year";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {StatisticsService} from "../services/statistics.service";

@Component({
  selector: 'app-stat-by-year',
  templateUrl: './stat-by-year.component.html',
  styleUrls: ['./stat-by-year.component.css']
})
export class StatByYearComponent implements OnInit {
  statsByYear: StatByYear[] = [
    {year: "2023", cost: 0},
    {year: "2022", cost: 0},
    {year: "2021", cost: 0},
    {year: "2020", cost: 0},
    {year: "2019", cost: 0},
    {year: "2018", cost: 0},
    {year: "2017", cost: 0},
    {year: "2016", cost: 0}
  ]

  statsByYearChart: any[] = [
    {name: "2023", value: 0},
    {name: "2022", value: 0},
    {name: "2021", value: 0},
    {name: "2020", value: 0},
    {name: "2019", value: 0},
    {name: "2018", value: 0},
    {name: "2017", value: 0},
    {name: "2016", value: 0}
  ]

  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  xLabel: string = $localize`Godina`;
  yLabel: string = $localize`Trošak`;
  colorScheme: Color = {
    name: "MyColor",
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#fc9803'],
  };
  xAxis: boolean = true
  yAxis: boolean = true
  showXAxisLabel: boolean = true
  showYAxisLabel: boolean = true

  constructor(private _statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.getStatistics()
  }

  getStatistics() {
    this._statisticsService.getStatsByYear().subscribe(stats => {
      for (const [key, value] of Object.entries(stats)) {

        this.statsByYear.forEach(stat => {
          if (key === stat.year) {
            stat.cost = value;
          }
        })

        this.statsByYearChart.forEach(stat => {
          if (key === stat.name) {
            stat.value = value;
          }
        })
      }
      this.updateChart();
    })
  }

  updateChart() {
    this.statsByYear = [...this.statsByYear];
    this.statsByYearChart = [...this.statsByYearChart];
  }

}
