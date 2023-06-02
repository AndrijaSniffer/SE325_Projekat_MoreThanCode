import {Expense} from "./expense";
import {Income} from "./income";

export class TableOptions {
  totalPages: number
  totalElements: number
  pageSize: number
  pageNumber: number
  isFirst: boolean
  isLast: boolean
  sort: Sort
  expenseList?: Expense[]
  incomeList?: Income[]
}

class Sort {
  order: string
  direction: string
}
