import {Component, OnInit} from '@angular/core';
import {StatByShop} from "../classes/stat-by-shop";
import {LegendPosition} from "@swimlane/ngx-charts";
import {StatisticsService} from "../services/statistics.service";

@Component({
  selector: 'app-stat-by-property',
  templateUrl: './stat-by-property.component.html',
  styleUrls: ['./stat-by-property.component.css']
})
export class StatByPropertyComponent implements OnInit {
  statsByShop: StatByShop[] = []

  statsByShopPie: { name: string, value: number }[] = []

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  colorScheme: string = "picnic"

  constructor(private _statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.getStatistics()
  }

  getStatistics() {
    this._statisticsService.getStatByShop().subscribe(stats => {
      for (const [key, value] of Object.entries(stats)) {
        let stat: StatByShop = {
          shop: key,
          cost: value
        }

        let statPie: { name: string, value: number } = {
          name: key,
          value: value
        }

        this.statsByShop.push(stat);
        this.statsByShop = [...this.statsByShop]

        this.statsByShopPie.push(statPie);
        this.statsByShopPie = [...this.statsByShopPie]
      }
    })
  }
}
