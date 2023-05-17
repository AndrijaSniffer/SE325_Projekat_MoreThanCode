import {Component, OnInit} from '@angular/core';
import {StatByYear} from "../classes/stat-by-year";
import {Color, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-stat-by-year',
  templateUrl: './stat-by-year.component.html',
  styleUrls: ['./stat-by-year.component.css']
})
export class StatByYearComponent implements OnInit {
  statsByYear: StatByYear[] = [
    {year: 2023, cost: 2432.22},
    {year: 2022, cost: 68000.22},
    {year: 2021, cost: 51000.22},
    {year: 2020, cost: 22222.22},
    {year: 2019, cost: 43000.22},
    {year: 2018, cost: 32000.22},
    {year: 2017, cost: 24563.22},
    {year: 2016, cost: 12543.22}
  ]

  statsByYearChart: any[] = [
    {name: "2023", value: 2432.22},
    {name: "2022", value: 68000.22},
    {name: "2021", value: 51000.22},
    {name: "2020", value: 22222.22},
    {name: "2019", value: 43000.22},
    {name: "2018", value: 32000.22},
    {name: "2017", value: 24563.22},
    {name: "2016", value: 12543.22}
  ]

  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  xLabel: string = "Godina"
  yLabel: string = "Potrosnja"
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
