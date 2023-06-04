import {Component, Inject, LOCALE_ID} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {YesNoDialogComponent} from "./yes-no-dialog/yes-no-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showNavbar = false;

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string,
              private _userService: UserService,
              private _modalService: NgbModal) {

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
    const modalRef = this._modalService.open(YesNoDialogComponent);
    modalRef.componentInstance.openReason = "logout"
    modalRef.result.then(
      (result) => {
        console.warn(result)
        if (result === "yes") {
          this._userService.logoutUser();
        }
      },
      (reason) => {
      }
    )

  }

  title = 'se325_frontend';
}
