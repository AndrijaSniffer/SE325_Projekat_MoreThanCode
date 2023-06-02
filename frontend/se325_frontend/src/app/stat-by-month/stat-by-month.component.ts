import {Component, OnInit} from '@angular/core';
import {StatByMonth} from "../classes/stat-by-month";
import {Color, ScaleType} from "@swimlane/ngx-charts";
import {StatisticsService} from "../services/statistics.service";

@Component({
  selector: 'app-stat-by-month',
  templateUrl: './stat-by-month.component.html',
  styleUrls: ['./stat-by-month.component.css']
})
export class StatByMonthComponent implements OnInit {

  statsByMonths: StatByMonth[] = [
    {month: "January", cost: 0},
    {month: "February", cost: 0},
    {month: "March", cost: 0},
    {month: "April", cost: 0},
    {month: "May", cost: 0},
    {month: "June", cost: 0},
    {month: "July", cost: 0},
    {month: "Avgust", cost: 0},
    {month: "September", cost: 0},
    {month: "October", cost: 0},
    {month: "November", cost: 0},
    {month: "December", cost: 0}
  ]

  statsByMonthChart: any[] = [
    {name: "January", value: 0},
    {name: "February", value: 0},
    {name: "March", value: 0},
    {name: "April", value: 0},
    {name: "May", value: 0},
    {name: "June", value: 0},
    {name: "July", value: 0},
    {name: "Avgust", value: 0},
    {name: "September", value: 0},
    {name: "October", value: 0},
    {name: "November", value: 0},
    {name: "December", value: 0}
  ]

  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  // xLabel: string = $localize `Mesec`;
  // yLabel: string = $localize `Trošak`;
  colorScheme: Color = {
    name: "MyColor",
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#09eb42'],
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
    this._statisticsService.getStatsByMonth().subscribe(stats => {
      for (const [key, value] of Object.entries(stats)) {

        this.statsByMonths.forEach(stat => {
          if (key.toLowerCase() === stat.month.toLowerCase()) {
            stat.cost = value;
          }
        })

        this.statsByMonthChart.forEach(stat => {
          if (key.toLowerCase() === stat.name.toLowerCase()) {
            stat.value = value;
          }
        })
      }
      this.updateChart();
    })
  }

  updateChart() {

    this.statsByMonths = [...this.statsByMonths];
    this.statsByMonthChart = [...this.statsByMonthChart];
  }

}
