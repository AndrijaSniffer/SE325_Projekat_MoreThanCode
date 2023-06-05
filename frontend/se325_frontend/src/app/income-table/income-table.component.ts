import {Component, Inject, LOCALE_ID, OnDestroy, OnInit} from '@angular/core';
import {TableOptions} from "../classes/table-options";
import {Income} from "../classes/income";
import {Router} from "@angular/router";
import {IncomesService} from "../services/incomes.service";
import {YesNoDialogComponent} from "../yes-no-dialog/yes-no-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IncomesDialogComponent} from "../incomes-dialog/incomes-dialog.component";
import {SearchService} from "../services/search.service";
import {Subscription} from "rxjs";

interface CloseDto {
  reason: string,
  income: Income
}

@Component({
  selector: 'app-income-table',
  templateUrl: './income-table.component.html',
  styleUrls: ['./income-table.component.css']
})
export class IncomeTableComponent implements OnInit, OnDestroy {
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

  incomes: Income[] = [];

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string,
              private _incomeService: IncomesService,
              private _modalService: NgbModal,
              private _searchService: SearchService) {

  }

  ngOnInit(): void {
    this.getAllIncome();
    this.searchSub = this._searchService.search.subscribe((value) => {
      this.searchEvent(value);
    });
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
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
      this.options = tableOptions;
      this.incomes = tableOptions.incomeList;
    })
    this.currentPageNumber = 1;
  }

  openUpdateDialog(id: number) {
    this._incomeService.getIncomeById(id).subscribe((income: Income) => {
      const modelRef = this._modalService.open(IncomesDialogComponent);
      modelRef.componentInstance.income = income
      modelRef.result.then(
        (result: CloseDto) => {

          if (result.reason === "save") {
            this._incomeService.updateIncome(id, result.income).subscribe((expense) => {
              this.getAllIncome();
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
    modalRef.componentInstance.openReason = "income"
    modalRef.result.then(
      (result) => {
        if (result === "yes") {
          this._incomeService.deleteIncome(id).subscribe((response) => {
            this.getAllIncome();
          });
        }
      },
      (reason) => {
      }
    )
  }

  searchEvent(searchValue: string) {
    if (this._router.url === "/incomes") {
      if (searchValue !== "") {
        this._incomeService.searchIncomeBySource(searchValue).subscribe((tableOptions: TableOptions) => {
          this.options = tableOptions;
          this.incomes = tableOptions.incomeList;
        })
        this.currentPageNumber = 1;
      } else {
        this.getAllIncome();
      }
    }
  }
}
