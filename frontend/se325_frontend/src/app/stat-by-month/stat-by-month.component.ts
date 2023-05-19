import {Component, OnInit} from '@angular/core';
import {StatByMonth} from "../classes/stat-by-month";
import {Color, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-stat-by-month',
  templateUrl: './stat-by-month.component.html',
  styleUrls: ['./stat-by-month.component.css']
})
export class StatByMonthComponent implements OnInit {

  statsByMonths: StatByMonth[] = [
    {month: "Januar", cost: 2432.22},
    {month: "Februar", cost: 68000.22},
    {month: "Mart", cost: 51000.22},
    {month: "April", cost: 22222.22},
    {month: "Maj", cost: 42130.22},
    {month: "Jun", cost: 43000.22},
    {month: "Jul", cost: 32000.22},
    {month: "Avgust", cost: 24563.22},
    {month: "Septembar", cost: 12543.22},
    {month: "Oktobar", cost: 54233.22},
    {month: "Novembar", cost: 85621.22},
    {month: "Decembar", cost: 33254.22}
  ]

  statsByMonthChart: any[] = [
    {name: "Januar", value: 2432.22},
    {name: "Februar", value: 68000.22},
    {name: "Mart", value: 51000.22},
    {name: "April", value: 22222.22},
    {name: "Maj", value: 42130.22},
    {name: "Jun", value: 43000.22},
    {name: "Jul", value: 32000.22},
    {name: "Avgust", value: 24563.22},
    {name: "Septembar", value: 12543.22},
    {name: "Oktobar", value: 54233.22},
    {name: "Novembar", value: 85621.22},
    {name: "Decembar", value: 33254.22}
  ]

  gradient: boolean = false;
  showLegend: boolean = false;
  showLabels: boolean = true;
  // xLabel: string = $localize `Mesec`;
  // yLabel: string = $localize `Potrošnja`;
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
