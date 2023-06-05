import {Component, Inject, LOCALE_ID} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";
import {YesNoDialogComponent} from "./yes-no-dialog/yes-no-dialog.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SearchService} from "./services/search.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup;
  showNavbar = false;

  constructor(private _router: Router,
              @Inject(LOCALE_ID) public activeLocale: string,
              private _userService: UserService,
              private _modalService: NgbModal,
              private _formBuilder: FormBuilder,
              private _searchService: SearchService) {
    this._userService.isLogedIn.subscribe(isLogedIn => {
      this.showNavbar = isLogedIn;
    })

    this.form = this._formBuilder.group({
      search: new FormControl("")
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
        if (result === "yes") {
          this._userService.logoutUser();
        }
      },
      (reason) => {
      }
    )

  }

  search() {
    this._searchService.passValue(this.form.value.search);
  }

  title = 'se325_frontend';
}
