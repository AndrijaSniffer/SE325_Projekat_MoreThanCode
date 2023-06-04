import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Expense} from "../classes/expense";
import {TableOptions} from "../classes/table-options";
import {Router} from "@angular/router";
import {ExpensesService} from "../services/expenses.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ExpensesDialogComponent} from "../expenses-dialog/expenses-dialog.component";
import {YesNoDialogComponent} from "../yes-no-dialog/yes-no-dialog.component";

interface CloseDto {
  reason: string,
  expense: Expense
}

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
  closeDto: CloseDto

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string,
              private _expenseService: ExpensesService,
              private _modalService: NgbModal) {
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

  openUpdateDialog(id: number) {
    this._modalService.open(ExpensesDialogComponent).result.then(
      (result: CloseDto) => {

        if (result.reason === "save") {
          console.warn(result.expense)
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
  }

  openDeleteDialog(id: number) {
    const modalRef = this._modalService.open(YesNoDialogComponent);
    modalRef.componentInstance.openReason = "expense"
    modalRef.result.then(
      (result) => {
        console.warn(result)
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

}
