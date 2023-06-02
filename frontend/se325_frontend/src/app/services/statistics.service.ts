import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private _http: HttpClient) {
  }

  getStatByShop() {
    return this._http.get("http://localhost:8080/expense-statistic-by-shop", {withCredentials: true});
  }

  getStatsByMonth() {
    return this._http.get("http://localhost:8080/expense-statistic-by-month", {withCredentials: true});
  }

  getStatsByYear() {
    return this._http.get("http://localhost:8080/expense-statistic-by-year", {withCredentials: true});
  }
}
