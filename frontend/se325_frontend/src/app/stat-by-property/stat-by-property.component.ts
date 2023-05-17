import {Component, OnInit} from '@angular/core';
import {StatByShop} from "../classes/stat-by-shop";
import {LegendPosition} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-stat-by-property',
  templateUrl: './stat-by-property.component.html',
  styleUrls: ['./stat-by-property.component.css']
})
export class StatByPropertyComponent implements OnInit {
  statsByShop: StatByShop[] = [
    {shop: "Maxi", cost: 2432.22},
    {shop: "Gigatron", cost: 68000.22},
    {shop: "Idea", cost: 51000.22},
    {shop: "Sport vision", cost: 22222.22},
    {shop: "Win win", cost: 43000.22},
    {shop: "Tempo", cost: 32000.22},
    {shop: "Merkator", cost: 24563.22},
    {shop: "NIS Petrol", cost: 12543.22}
  ]

  statsByShopPie: any[] = [
    {name: "Maxi", value: 2432.22},
    {name: "Gigatron", value: 68000.22},
    {name: "Idea", value: 51000.22},
    {name: "Sport vision", value: 22222.22},
    {name: "Win win", value: 43000.22},
    {name: "Tempo", value: 32000.22},
    {name: "Merkator", value: 24563.22},
    {name: "NIS Petrol", value: 12543.22}
  ]

  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Right;
  colorScheme: string = "picnic"

  constructor() {
  }

  ngOnInit(): void {
    // setTimeout(function(){
    //   let labels = $('.pie-label');
    //   for (let label of labels){
    //     label.innerHTML += "%";
    //   }
    // }, 100)
  }

}
