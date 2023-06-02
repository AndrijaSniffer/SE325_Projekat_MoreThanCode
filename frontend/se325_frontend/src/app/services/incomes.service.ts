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

  createIncomes(income: Income) {
    console.warn(income)
    return this._http.post("http://localhost:8080/incomes", JSON.stringify(income),
      {withCredentials: true, headers: new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8')})
  }
}
