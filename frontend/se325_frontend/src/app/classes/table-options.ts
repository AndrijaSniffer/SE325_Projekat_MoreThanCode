export class TableOptions {
  totalPages: number
  totalElements: number
  pageSize: number
  pageNumber: number
  isFirst: boolean
  isLast: boolean
  sort: Sort
}

class Sort {
  order: string
  direction: string
}
