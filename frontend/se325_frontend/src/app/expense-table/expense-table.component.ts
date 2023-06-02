import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Expense} from "../classes/expense";
import {TableOptions} from "../classes/table-options";
import {Router} from "@angular/router";
import {ExpensesService} from "../services/expenses.service";

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit {
  currentPageNumber: number;
  options: TableOptions = {
    pageNumber: 0,
    isFirst: false,
    isLast: false,
    totalPages: 1,
    pageSize: 10,
    totalElements: 1,
    sort: {
      direction: "DESC",
      order: "date"
    }
  };
  expenses: Expense[] = [];

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string,
              private _expenseService: ExpensesService) {
  }

  ngOnInit(): void {
    this.getAllExpense();
  }

  onPageChange(page: number) {
    console.log("Page change:", page)
    console.log("Page change:", this.currentPageNumber)
    if (this.options.pageNumber != page - 1) {
      this.getAllExpense(page - 1);
      this.currentPageNumber = page;
    }
  }

  goToIncomeTable() {
    this._router.navigate(["incomes"]).then()
  }

  goToAddExpense() {
    this._router.navigate(["add-expense"]).then()
  }

  tableSort(property: string) {
    let sort: string;

    if (this.options.sort.order == property) {
      this.options.sort.direction = this.options.sort.direction == 'ASC' ? 'DESC' : 'ASC'

      sort = this.options.sort.direction === "DESC" ? "-" : ""
      sort += property

      this.getAllExpense(this.options.pageNumber, this.options.pageSize, sort)
    } else {
      this.options.sort.order = property
      this.options.sort.direction = 'DESC'

      sort = `-${property}`

      this.getAllExpense(this.options.pageNumber, this.options.pageSize, sort)
    }
  }

  getAllExpense(pageNumber: number = 0, pageSize: number = 10, sort: string = "-date") {
    this._expenseService.getAllExpenses(pageNumber, pageSize, sort).subscribe((tableOptions: TableOptions) => {
      console.warn(tableOptions);
      this.options = tableOptions;
      this.expenses = tableOptions.expenseList;
    })
    this.currentPageNumber = 1;
  }

}
