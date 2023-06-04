import {Component, Inject, LOCALE_ID} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showNavbar = false;

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string,
              private _userService: UserService) {

    this._userService.isLogedIn.subscribe(isLogedIn => {
      this.showNavbar = isLogedIn;
    })
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

  logoutUser() {
    this._userService.logoutUser();
  }

  title = 'se325_frontend';
}
