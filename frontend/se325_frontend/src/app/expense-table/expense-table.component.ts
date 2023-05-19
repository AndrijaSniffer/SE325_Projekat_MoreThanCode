import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Expense} from "../classes/expense";
import {TableOptions} from "../classes/table-options";
import {Router} from "@angular/router";

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {
  options: TableOptions = {
    pageNumber: 1,
    pageSize: 10,
    totalElements: 50,
    totalPages: 5,
    isFirst: true,
    isLast: false,
    sort: {
      direction: "desc",
      order: "shop"
    }
  }
  expenses: Expense[] = [
    {expenseId: 1, date: "2019-06-12", shop: "Tempo", cost: 2000.0},
    {expenseId: 1, date: "2019-06-13", shop: "Merkator", cost: 5500.0},
    {expenseId: 1, date: "2019-06-14", shop: "Merkator", cost: 8000.0},
    {expenseId: 1, date: "2019-10-18", shop: "Idea", cost: 15000.0},
    {expenseId: 1, date: "2019-11-28", shop: "Idea", cost: 10000.0},
    {expenseId: 1, date: "2020-01-04", shop: "Sport Vision", cost: 12600.0},
    {expenseId: 1, date: "2019-01-05", shop: "NIS Petrol", cost: 8500.0},
    {expenseId: 1, date: "2019-01-08", shop: "Win Win", cost: 31800.0},
    {expenseId: 1, date: "2019-02-12", shop: "Gigatron", cost: 46000.0},
    {expenseId: 1, date: "2019-02-21", shop: "Tempo", cost: 9600.0},
  ]

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string) {
  }

  ngOnInit(): void {
  }

  onPageChange(page: number) {
    console.log("Page change:", page)
  }

  goToIncomeTable() {
    this._router.navigate(["incomes"]).then()
  }

  goToAddExpense() {
    this._router.navigate(["add-expense"]).then()
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
