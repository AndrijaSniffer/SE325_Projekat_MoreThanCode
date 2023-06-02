import {User} from "./user";

export class Income {
  incomeId?: number
  date: string
  source: string
  earning: number
  user?: User
}
