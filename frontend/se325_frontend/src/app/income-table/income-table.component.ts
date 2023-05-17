import {Component, OnInit} from '@angular/core';
import {TableOptions} from "../classes/table-options";
import {Income} from "../classes/income";
import {Router} from "@angular/router";

@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.css']
})
export class IncomeTableComponent implements OnInit {
  options: TableOptions = {
    pageNumber: 1,
    pageSize: 10,
    totalElements: 50,
    totalPages: 5,
    isFirst: true,
    isLast: false,
    sort: {
      direction: "desc",
      order: "date"
    }
  }

  expenses: Income[] = [
    {incomeId: 1, date: "2019-06-12", source: "Prodaja namirnica", earning: 2000.0},
    {incomeId: 1, date: "2019-06-13", source: "Prodaja namirnica", earning: 5500.0},
    {incomeId: 1, date: "2019-06-14", source: "Prodaja namirnica", earning: 8000.0},
    {incomeId: 1, date: "2019-10-18", source: "Posao", earning: 15000.0},
    {incomeId: 1, date: "2019-11-28", source: "Posao", earning: 10000.0},
    {incomeId: 1, date: "2020-01-04", source: "Posao", earning: 12600.0},
    {incomeId: 1, date: "2019-01-05", source: "Prodaja namirnica", earning: 8500.0},
    {incomeId: 1, date: "2019-01-08", source: "Posao", earning: 31800.0},
    {incomeId: 1, date: "2019-02-12", source: "Posao", earning: 46000.0},
    {incomeId: 1, date: "2019-02-21", source: "Prodaja namirnica", earning: 9600.0},
  ]

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
  }

  onPageChange(page: number) {

  }

  goToExpensesTable() {
    this._router.navigate([""]).then()
  }

  goToIncomeForm() {
    this._router.navigate(["add-income"])
  }

  tableSort(property: string) {
    if (this.options.sort.order == property) {
      this.options.sort.direction = this.options.sort.direction == 'asc' ? 'desc' : 'asc'
    } else {
      this.options.sort.order = property
      this.options.sort.direction = 'desc'
    }
  }

}
