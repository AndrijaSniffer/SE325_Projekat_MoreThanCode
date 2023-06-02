import {User} from "./user";

export class Expense {
  expenseId?: number
  date: string
  shop: string
  cost: number
  user?: User
}
