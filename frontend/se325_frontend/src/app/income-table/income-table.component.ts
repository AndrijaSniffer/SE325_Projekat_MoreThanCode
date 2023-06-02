import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {TableOptions} from "../classes/table-options";
import {Income} from "../classes/income";
import {Router} from "@angular/router";
import {IncomesService} from "../services/incomes.service";

@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.css']
})
export class IncomeTableComponent implements OnInit {
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

  incomes: Income[] = [];

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string,
              private _incomeService: IncomesService) {

  }

  ngOnInit(): void {
    this.getAllIncome();
  }

  onPageChange(page: number) {
    if (this.options.pageNumber != page - 1) {
      this.getAllIncome(page - 1);
      this.currentPageNumber = page;
    }
  }

  goToExpensesTable() {
    this._router.navigate([""]).then()
  }

  E
  goToIncomeForm() {
    this._router.navigate(["add-income"])
  }

  tableSort(property: string) {
    let sort: string;

    if (this.options.sort.order == property) {
      this.options.sort.direction = this.options.sort.direction == 'ASC' ? 'DESC' : 'ASC'

      sort = this.options.sort.direction === "DESC" ? "-" : ""
      sort += property

      this.getAllIncome(this.options.pageNumber, this.options.pageSize, sort)
    } else {
      this.options.sort.order = property
      this.options.sort.direction = 'DESC'

      sort = `-${property}`

      this.getAllIncome(this.options.pageNumber, this.options.pageSize, sort)
    }
  }

  getAllIncome(pageNumber: number = 0, pageSize: number = 10, sort: string = "-date") {
    this._incomeService.getAllIncomes(pageNumber, pageSize, sort).subscribe((tableOptions: TableOptions) => {
      console.warn(tableOptions);
      this.options = tableOptions;
      this.incomes = tableOptions.incomeList;
    })
    this.currentPageNumber = 1;
  }
}
