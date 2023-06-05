import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private _search: Subject<string> = new Subject<string>();
  search: Observable<string>;

  constructor() {
    this._search.next("");
    this.search = this._search.asObservable();
  }

  passValue(value: string) {
    this._search.next(value);
  }
}
