import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Expense} from "../classes/expense";

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private _http: HttpClient) {
  }

  getAllExpenses(pageNumber: number = 0, pageSize: number = 10, sort: string = "date"): Observable<object> {
    return this._http.get(`http://localhost:8080/expenses?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`, {withCredentials: true})
  }

  createExpense(expense: Expense) {
    console.warn(expense)
    return this._http.post("http://localhost:8080/expenses", JSON.stringify(expense),
      {withCredentials: true, headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')})
  }

  updateExpense(id: number, expense: Expense) {
    return this._http.put(`http://localhost:8080/expenses/${id}`, JSON.stringify(expense),
      {withCredentials: true, headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')});
  }

  deleteExpense(id: number) {
    return this._http.delete(`http://localhost:8080/expenses/${id}`, {withCredentials: true})
  }
}
