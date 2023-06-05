import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {Expense} from "../classes/expense";
import {TableOptions} from "../classes/table-options";
import {Router} from "@angular/router";
import {ExpensesService} from "../services/expenses.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ExpensesDialogComponent} from "../expenses-dialog/expenses-dialog.component";
import {YesNoDialogComponent} from "../yes-no-dialog/yes-no-dialog.component";
import {SearchService} from "../services/search.service";
import {Subscription} from "rxjs";

interface CloseDto {
  reason: string,
  expense: Expense
}

@Component({
  selector: 'app-expense-table',
  templateUrl: './expense-table.component.html',
  styleUrls: ['./expense-table.component.css']
})
export class ExpenseTableComponent implements OnInit, OnDestroy {
  currentPageNumber: number;
  searchSub: Subscription;
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
  closeDto: CloseDto

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string,
              private _expenseService: ExpensesService,
              private _modalService: NgbModal,
              private _searchService: SearchService) {
  }

  ngOnInit(): void {
    this.getAllExpense();
    this.searchSub = this._searchService.search.subscribe((value) => {
      this.searchEvent(value);
    })
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

  onPageChange(page: number) {
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
      this.options = tableOptions;
      this.expenses = tableOptions.expenseList;
    })
    this.currentPageNumber = 1;
  }

  openUpdateDialog(id: number) {
    this._expenseService.getExpenseById(id).subscribe((expense: Expense) => {

      const modelRef = this._modalService.open(ExpensesDialogComponent);
      modelRef.componentInstance.expense = expense
      modelRef.result.then(
        (result: CloseDto) => {

          if (result.reason === "save") {
            this._expenseService.updateExpense(id, result.expense).subscribe((expense) => {
              this.getAllExpense();
            }, error => {
              alert("An error has occurred")
            })
          }
        },
        (reason) => {
        }
      );
    })
  }

  openDeleteDialog(id: number) {
    const modalRef = this._modalService.open(YesNoDialogComponent);
    modalRef.componentInstance.openReason = "expense"
    modalRef.result.then(
      (result) => {
        if (result === "yes") {
          this._expenseService.deleteExpense(id).subscribe((response) => {
            this.getAllExpense();
          });
        }
      },
      (reason) => {
      }
    )
  }

  searchEvent(searchValue: string) {
    if (this._router.url === "/") {
      if (searchValue !== "") {
        this._expenseService.searchExpenseByShop(searchValue).subscribe((tableOptions: TableOptions) => {
          this.options = tableOptions;
          this.expenses = tableOptions.expenseList;

          this.currentPageNumber = 1;
        })
      } else {
        this.getAllExpense()
      }
    }
  }

}
