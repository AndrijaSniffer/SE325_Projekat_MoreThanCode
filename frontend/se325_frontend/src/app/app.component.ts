import {Component, Inject, LOCALE_ID} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string) {
  }

  navigateToHome() {
    this._router.navigate([""]).then()
  }

  navigateToStatisticByShop() {
    this._router.navigate(["stat-shop"])
  }

  navigateToStatisticByYear() {
    this._router.navigate(["stat-year"])
  }

  navigateToStatisticsByMonth() {
    this._router.navigate(["stat-month"])
  }

  changeLocale(lang: string) {
    window.location.href = `/${lang}`;
  }

  title = 'se325_frontend';
}
