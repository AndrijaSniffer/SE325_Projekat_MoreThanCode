import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Income} from "../classes/income";

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(private _http: HttpClient) {
  }

  getAllIncomes(pageNumber: number = 0, pageSize: number = 10, sort: string = "date"): Observable<object> {
    return this._http.get(`http://localhost:8080/incomes?pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`, {withCredentials: true})
  }

  getIncomeById(id: number): Observable<object> {
    return this._http.get(`http://localhost:8080/incomes/${id}`, {withCredentials: true})
  }

  createIncomes(income: Income) {
    return this._http.post("http://localhost:8080/incomes", JSON.stringify(income),
      {withCredentials: true, headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')})
  }

  updateIncome(id: number, income: Income) {
    return this._http.put(`http://localhost:8080/incomes/${id}`, JSON.stringify(income),
      {withCredentials: true, headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')});
  }

  deleteIncome(id: number) {
    return this._http.delete(`http://localhost:8080/incomes/${id}`, {withCredentials: true})
  }

  searchIncomeBySource(source: string, pageNumber: number = 0, pageSize: number = 10, sort: string = "date") {
    return this._http.get(`http://localhost:8080/incomes/?source=${source}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`, {withCredentials: true})
  }
}
